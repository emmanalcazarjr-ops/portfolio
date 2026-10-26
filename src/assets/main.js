// Homepage behaviour. The markup is static (built by build.ps1); this file only adds:
// - demo videos that play while on screen and pause otherwise
// - the n8n highlight video (click to engage, "Play with sound", custom captions)
// - the About overlay at #about
// - project tiles that open their /projects/<id> page
// - the "Explore project" cursor pill over demo videos

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const grid = $('#main-grid');
const sidebar = $('.sidebar');
const aboutView = $('#aboutView');
const openAboutBtn = $('#openAboutBtn');
const closeAboutBtn = $('#closeAboutBtn');
const cursorPill = $('#cursorPill');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Videos: play only what is on screen ---------- */

let overlayOpen = false;
const onScreen = new Set();
const videoObserver = new IntersectionObserver((entries) => {
  for (const { target, isIntersecting } of entries) {
    if (isIntersecting) onScreen.add(target);
    else onScreen.delete(target);
  }
  syncVideos();
}, { rootMargin: '120px 0px' });

// Videos that start with data-src instead of src download nothing until first needed.
function attachSrc(video) {
  if (video.dataset.src && !video.getAttribute('src')) video.src = video.dataset.src;
}

function syncVideos() {
  const pageActive = !overlayOpen && !document.hidden;
  const autoplay = pageActive && !reducedMotion.matches;
  for (const video of $$('video', grid)) {
    if (video.dataset.engaged) {
      if (!pageActive || !onScreen.has(video)) video.pause();
      continue;
    }
    if (autoplay && onScreen.has(video)) {
      // Lazy videos wait until the page has finished loading everything else.
      if (video.dataset.src && document.readyState !== 'complete') continue;
      attachSrc(video);
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }
}

function setOverlayOpen(open) {
  overlayOpen = open;
  syncVideos();
}

$$('video', grid).forEach((video) => videoObserver.observe(video));
window.addEventListener('load', syncVideos, { once: true });
reducedMotion.addEventListener('change', syncVideos);
document.addEventListener('visibilitychange', syncVideos);

// A video that fails to load shows its fallback panel instead.
document.addEventListener('error', (event) => {
  if (event.target instanceof HTMLVideoElement) {
    event.target.closest('.project-video-frame, .dialog-media, .highlight-media')?.classList.add('is-missing');
  }
}, true);

/* ---------- Highlight video ---------- */

function engage(video, withSound) {
  video.dataset.engaged = '1';
  video.controls = true;
  video.closest('.highlight-media')?.classList.add('is-engaged');
  attachSrc(video);
  if (withSound) {
    video.muted = false;
    video.loop = false;
    video.currentTime = 0;
    video.play().catch(() => {});
  }
}

grid.addEventListener('click', (event) => {
  const media = event.target.closest('.highlight-media');
  const video = media?.querySelector('video');
  if (!video || video.dataset.engaged) return;
  const soundBtn = event.target.closest('.highlight-sound');
  engage(video, Boolean(soundBtn));
  if (soundBtn) video.focus();
});

// Captions are drawn in our own <p> so they can be styled and moved above the controls.
function setUpCaptions() {
  const video = $('.highlight-video', grid);
  const box = $('.highlight-captions', grid);
  const track = video?.textTracks[0];
  if (!track || !box) return;
  let captionsOn = true;
  const render = () => {
    const cue = captionsOn ? track.activeCues?.[0] : null;
    box.textContent = cue ? cue.text : '';
    box.hidden = !cue;
  };
  track.mode = 'hidden';
  track.addEventListener('cuechange', render);
  // The native CC button toggles the track; mirror that into our caption box.
  video.textTracks.addEventListener('change', () => {
    if (track.mode === 'showing') {
      captionsOn = true;
      track.mode = 'hidden';
    } else if (track.mode === 'disabled') {
      captionsOn = false;
    }
    render();
  });
}
setUpCaptions();

/* ---------- Project tiles open their case-study page ---------- */

// Each tile already has a "Case study" link; this makes the rest of the tile clickable too.
grid.addEventListener('click', (event) => {
  if (event.target.closest('a, button, video[controls]')) return;
  const card = event.target.closest('[data-project-id]');
  if (!card) return;
  const url = `/projects/${card.dataset.projectId}`;
  if (event.ctrlKey || event.metaKey) window.open(url, '_blank', 'noopener');
  else location.href = url;
});

/* ---------- About overlay ---------- */

function setAboutOpen(open) {
  aboutView.hidden = !open;
  [sidebar, grid].forEach((el) => { el.inert = open; });
  document.documentElement.classList.toggle('is-locked', open);
  setOverlayOpen(open);
}

function openAbout() {
  setAboutOpen(true);
  aboutView.scrollTop = 0;
  if (location.hash !== '#about') history.pushState({ view: 'about' }, '', '#about');
  closeAboutBtn.focus();
}

function closeAbout() {
  setAboutOpen(false);
  if (location.hash === '#about') history.pushState(null, '', location.pathname + location.search);
  openAboutBtn.focus();
}

openAboutBtn.addEventListener('click', openAbout);
closeAboutBtn.addEventListener('click', closeAbout);
window.addEventListener('popstate', () => setAboutOpen(location.hash === '#about'));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !aboutView.hidden) closeAbout();
});
if (location.hash === '#about') openAbout();

/* ---------- Cursor pill (mouse only) ---------- */

if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let targetX = -100, targetY = -100, x = -100, y = -100, frame = 0;
  const follow = () => {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    cursorPill.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(follow) : 0;
  };
  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    const show = Boolean(event.target.closest?.('.project-video-card')) && aboutView.hidden;
    cursorPill.classList.toggle('visible', show);
    if (show && !frame) frame = requestAnimationFrame(follow);
  }, { passive: true });
}
