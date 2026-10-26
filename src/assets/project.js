// Case-study page: the demo video loads and plays only while it is on screen.
const video = document.querySelector('.case-media video');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

if (video) {
  let onScreen = false;
  const sync = () => {
    if (onScreen && !document.hidden && !reducedMotion.matches) {
      if (!video.getAttribute('src')) video.src = video.dataset.src;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };
  // With reduced motion the video still loads on its first play click.
  video.addEventListener('play', () => {
    if (video.getAttribute('src')) return;
    video.src = video.dataset.src; // setting src resets the element, so start it again
    video.play().catch(() => {});
  });
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  }, { threshold: 0.25 }).observe(video);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  video.addEventListener('error', () => video.closest('.case-media')?.classList.add('is-missing'));
}
