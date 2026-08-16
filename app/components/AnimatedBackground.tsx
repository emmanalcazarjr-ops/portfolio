'use client'

import { useEffect, useRef } from 'react'

/**
 * Interactive aurora background — DeepSeek-harness style.
 * A WebGL2 "ink trail" pass draws a soft glowing brush that follows the
 * smoothed mouse position and decays over time; a second pass maps the
 * trail to the site's cyan/blue palette with a soft glow + vignette.
 * On touch devices / idle, a slow wandering brush keeps the background alive.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const VERT = `#version 300 es
      in vec2 a_pos;
      out vec2 vUv;
      void main() {
        vUv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }`

    const TRAIL_FS = `#version 300 es
      precision mediump float;
      in vec2 vUv;
      out vec4 outColor;
      uniform sampler2D uPrev;
      uniform vec2 uMouse;
      uniform vec2 uVel;
      uniform float uRadius;
      uniform float uStrength;
      uniform float uDecay;
      void main() {
        vec4 prev = texture(uPrev, vUv);
        prev.rgb *= uDecay;
        prev.a *= uDecay;
        vec2 d = vUv - uMouse;
        float dist2 = dot(d, d);
        float influence = exp(-dist2 / (uRadius * uRadius * 0.5));
        influence = max(influence - 0.012, 0.0);
        float speed = length(uVel);
        float strength = uStrength * 0.25 + min(speed * 3.0, 0.8) * uStrength;
        float ink = influence * strength;
        prev.r = max(prev.r, ink);
        float blend = influence * min(strength, 0.5) * 0.35;
        prev.g = mix(prev.g, clamp(uVel.x * 2.0 + 0.5, 0.0, 1.0), blend);
        prev.b = mix(prev.b, clamp(uVel.y * 2.0 + 0.5, 0.0, 1.0), blend);
        prev.a = max(prev.a, ink * 0.6);
        outColor = prev;
      }`

    const RENDER_FS = `#version 300 es
      precision mediump float;
      in vec2 vUv;
      out vec4 outColor;
      uniform sampler2D uTrail;
      uniform vec2 uRes;
      void main() {
        vec4 t = texture(uTrail, vUv);
        float core = t.r;
        float glow = 0.0;
        float step = 1.5 / uRes.x;
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            glow += texture(uTrail, vUv + vec2(float(x), float(y)) * step).r;
          }
        }
        glow = glow / 9.0;
        float e = core * 0.55 + glow * 0.75;
        vec3 col = mix(vec3(0.04, 0.07, 0.16), vec3(0.13, 0.83, 0.93), smoothstep(0.0, 0.25, e));
        col = mix(col, vec3(0.23, 0.51, 0.96), smoothstep(0.18, 0.5, e));
        col = mix(col, vec3(0.85, 0.93, 1.0), smoothstep(0.45, 0.85, e));
        vec2 vel = (t.gb - 0.5) * 2.0;
        col += vec3(vel.x * 0.06, vel.y * 0.04, 0.05);
        col *= e * 1.25;
        vec2 q = vUv - 0.5;
        float vg = 1.0 - dot(q, q) * 1.15;
        outColor = vec4(col * vg, 1.0);
      }`

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)
      if (!sh) return null
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('AnimatedBackground shader error:', gl.getShaderInfoLog(sh))
        return null
      }
      return sh
    }
    const makeProgram = (vsSrc: string, fsSrc: string) => {
      const vs = compile(gl.VERTEX_SHADER, vsSrc)
      const fs = compile(gl.FRAGMENT_SHADER, fsSrc)
      if (!vs || !fs) return null
      const p = gl.createProgram()
      if (!p) return null
      gl.attachShader(p, vs)
      gl.attachShader(p, fs)
      gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error('AnimatedBackground link error:', gl.getProgramInfoLog(p))
        return null
      }
      return p
    }

    const trailProg = makeProgram(VERT, TRAIL_FS)
    const renderProg = makeProgram(VERT, RENDER_FS)
    if (!trailProg || !renderProg) return

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    const makeTarget = () => {
      const tex = gl.createTexture()
      if (!tex) return null
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const fbo = gl.createFramebuffer()
      if (!fbo) return null
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      return { tex, fbo }
    }
    const A = makeTarget()
    const B = makeTarget()
    if (!A || !B) return
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    let W = 0
    let H = 0
    let TW = 0
    let TH = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      W = Math.max(1, Math.round(canvas.clientWidth * dpr))
      H = Math.max(1, Math.round(canvas.clientHeight * dpr))
      TW = Math.max(1, Math.round(W / 2))
      TH = Math.max(1, Math.round(H / 2))
      canvas.width = W
      canvas.height = H
      for (const t of [A, B]) {
        gl.bindTexture(gl.TEXTURE_2D, t.tex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TW, TH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, A.fbo)
      gl.viewport(0, 0, TW, TH)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindFramebuffer(gl.FRAMEBUFFER, B.fbo)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5, vx: 0, vy: 0 }
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    let pointerActive = false
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - r.left) / Math.max(1, r.width)
      mouse.y = 1 - (e.clientY - r.top) / Math.max(1, r.height)
      pointerActive = true
    }
    if (hasPointer) window.addEventListener('mousemove', onMove, { passive: true })

    let cur = A
    let nxt = B
    let raf = 0
    let last = 0
    const FRAME = 1000 / 30
    const t0 = performance.now()

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (now - last < FRAME) return
      last = now - ((now - last) % FRAME)
      const dt = (now - t0) * 0.001

      mouse.sx += (mouse.x - mouse.sx) * 0.08
      mouse.sy += (mouse.y - mouse.sy) * 0.08
      mouse.vx += ((mouse.x - mouse.sx) * 0.5 - mouse.vx) * 0.05
      mouse.vy += ((mouse.y - mouse.sy) * 0.5 - mouse.vy) * 0.05

      let brushX = mouse.sx
      let brushY = mouse.sy
      let strength = pointerActive ? 1 : 0
      if (!hasPointer || !pointerActive) {
        brushX = 0.5 + Math.sin(dt * 0.35) * 0.32
        brushY = 0.5 + Math.cos(dt * 0.27) * 0.3
        strength = 0.55
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, nxt.fbo)
      gl.viewport(0, 0, TW, TH)
      gl.useProgram(trailProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      const loc = gl.getAttribLocation(trailProg, 'a_pos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, cur.tex)
      gl.uniform1i(gl.getUniformLocation(trailProg, 'uPrev'), 0)
      gl.uniform2f(gl.getUniformLocation(trailProg, 'uMouse'), brushX, brushY)
      gl.uniform2f(gl.getUniformLocation(trailProg, 'uVel'), mouse.vx, mouse.vy)
      gl.uniform1f(gl.getUniformLocation(trailProg, 'uRadius'), 0.055)
      gl.uniform1f(gl.getUniformLocation(trailProg, 'uStrength'), strength * 0.9)
      gl.uniform1f(gl.getUniformLocation(trailProg, 'uDecay'), 0.965)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, W, H)
      gl.useProgram(renderProg)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, nxt.tex)
      gl.uniform1i(gl.getUniformLocation(renderProg, 'uTrail'), 0)
      gl.uniform2f(gl.getUniformLocation(renderProg, 'uRes'), TW, TH)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      const tmp = cur
      cur = nxt
      nxt = tmp
    }

    if (!reduced) {
      raf = requestAnimationFrame(tick)
    } else {
      tick(performance.now() + 1000)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (hasPointer) window.removeEventListener('mousemove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-blob aurora-blob-5" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen"
      />
      <div className="aurora-vignette" />
    </div>
  )
}
