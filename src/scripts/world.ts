// The journey world: an abstract particle terrain with real-coordinate beacons (no borders drawn),
// arcs that draw themselves along the journey, and a camera that eases to each chapter and holds there.
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, Group, Line, LineBasicMaterial,
  PerspectiveCamera, Points, QuadraticBezierCurve3, Scene, ShaderMaterial, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three'
import type { Material } from 'three'
import type { Place } from '../data/places'

type Step = { focus: string }
export type World = { setProgress(p: number): void; pause(): void; resume(): void; destroy(): void }

const CENTER = { lon: 76.2, lat: 18.4 }
const K = 0.95
const toXZ = (p: { lat: number; lon: number }) => new Vector3((p.lon - CENTER.lon) * K, 0, (CENTER.lat - p.lat) * K * 1.08)
const css = (name: string, fallback: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.16, 'rgba(255,255,255,.8)')
  grd.addColorStop(0.42, 'rgba(255,255,255,.14)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new CanvasTexture(c)
}

// Points on a grid, displaced in the vertex shader by a few moving sine octaves. Cheap, and it breathes.
function terrain(colors: Color[], small: boolean) {
  const n = small ? 100 : 150
  const size = 44
  const pos = new Float32Array(n * n * 3)
  let i = 0
  for (let x = 0; x < n; x++)
    for (let z = 0; z < n; z++) {
      pos[i++] = (x / (n - 1) - 0.5) * size
      pos[i++] = 0
      pos[i++] = (z / (n - 1) - 0.5) * size
    }
  const geo = new BufferGeometry()
  geo.setAttribute('position', new BufferAttribute(pos, 3))
  const mat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uA: { value: colors[0] }, uB: { value: colors[1] }, uC: { value: colors[2] }, uD: { value: colors[3] },
      uSize: { value: small ? 4.2 : 4.6 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uSize;
      varying float vH; varying float vFade; varying float vX;
      void main() {
        vec3 p = position;
        float h = sin(p.x * .32 + uTime * .3) * .55 + cos(p.z * .27 - uTime * .24) * .5
                + sin((p.x + p.z) * .7 + uTime * .5) * .14 + cos(length(p.xz) * .45 - uTime * .4) * .3;
        p.y = h - 1.4;
        vH = h; vX = p.x;
        vFade = smoothstep(22.0, 7.0, length(p.xz));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize * (14.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uD;
      varying float vH; varying float vFade; varying float vX;
      void main() {
        float d = length(gl_PointCoord - .5);
        if (d > .5) discard;
        float t = clamp((vX + 18.0) / 36.0, 0.0, 1.0);
        vec3 col = t < .33 ? mix(uA, uB, t / .33) : t < .66 ? mix(uB, uC, (t - .33) / .33) : mix(uC, uD, (t - .66) / .34);
        col = mix(vec3(.85), col, .65);
        float lift = smoothstep(-.8, 1.4, vH);
        gl_FragColor = vec4(col * (.5 + lift * .9), (1.0 - d * 2.0) * vFade * (.3 + lift * .5));
      }`,
  })
  return new Points(geo, mat)
}

function arc(a: Vector3, b: Vector3, color: Color) {
  const mid = a.clone().lerp(b, 0.5).add(new Vector3(0, a.distanceTo(b) * 0.38, 0))
  const pts = new QuadraticBezierCurve3(a.clone().setY(0.15), mid, b.clone().setY(0.15)).getPoints(90)
  const geo = new BufferGeometry().setFromPoints(pts)
  geo.setDrawRange(0, 0)
  const line = new Line(geo, new LineBasicMaterial({ color, transparent: true, opacity: 0.9, blending: AdditiveBlending }))
  return { line, total: pts.length }
}

export function startWorld(canvas: HTMLCanvasElement, labels: HTMLElement, places: Place[], steps: readonly Step[]): World {
  let small = innerWidth < 1024
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.25 : 1.5))
  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.1, 200)

  // The chromatic palette, read from the page's tokens so the 3D and the CSS never drift apart.
  const chroma = ['--c1', '--c2', '--c3', '--c4'].map((v, i) => new Color(css(v, ['#7DF9FF', '#7C9CFF', '#B98CFF', '#FF86C8'][i]!)))
  const ground = terrain(chroma, small)
  scene.add(ground)

  // Beacons: a glow sprite plus a thin light pillar. Journey stops are bigger and coloured; travel pins are quiet.
  const tex = glowTexture()
  const at: Record<string, Vector3> = {}
  const beacons: { id: string; sprite: Sprite; base: number; el: HTMLElement; kind: Place['kind']; shown: boolean }[] = []
  const warm = new Color('#FFFFFF')
  let ji = 0
  for (const p of places) {
    const v = toXZ(p)
    at[p.id] = v
    const big = p.kind === 'journey'
    const color = big ? chroma[ji++ % chroma.length]! : warm
    const g = new Group()
    g.position.copy(v)
    const sprite = new Sprite(new SpriteMaterial({ map: tex, color, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: big ? 1 : 0.55 }))
    const base = big ? 1.4 : 0.42
    sprite.scale.setScalar(base)
    sprite.position.y = big ? 0.5 : 0.25
    const pillar = new Line(
      new BufferGeometry().setFromPoints([new Vector3(0, -1.2, 0), new Vector3(0, big ? 2.2 : 0.7, 0)]),
      new LineBasicMaterial({ color, transparent: true, opacity: big ? 0.55 : 0.2, blending: AdditiveBlending }),
    )
    g.add(sprite, pillar)
    scene.add(g)
    const el = document.createElement('span')
    el.className = `w-label ${p.kind}`
    el.textContent = p.name
    labels.appendChild(el)
    beacons.push({ id: p.id, sprite, base, el, kind: p.kind, shown: false })
  }

  // The route follows the order the chapters first visit each place; each arc draws as its chapter arrives.
  const route: string[] = []
  for (const s of steps) if (at[s.focus] && !route.includes(s.focus)) route.push(s.focus)
  const arcStep = route.map(id => steps.findIndex(s => s.focus === id) + 1)
  const arcs = route.slice(1).map((id, i) => arc(at[route[i]!]!, at[id]!, chroma[(i + 1) % chroma.length]!))
  const travelArcs = places.filter(p => p.kind === 'travel').map(p => arc(at.bengaluru ?? new Vector3(), at[p.id]!, warm))
  for (const a of [...arcs, ...travelArcs]) scene.add(a.line)
  const wideAt = steps.length // the last chapter is the wide view

  // Camera keyframes: index 0 is the hero overview, then one per journey step.
  const wide = { pos: new Vector3(0.6, 15, 15), look: new Vector3(-0.6, -1, -0.5) }
  const keys = [
    { pos: new Vector3(0, 7.5, 17), look: new Vector3(0, -0.5, -2) },
    ...steps.map(s => {
      const t = at[s.focus]
      return t ? { pos: t.clone().add(new Vector3(0.6, 4.6, 7)), look: t.clone().add(new Vector3(0, -0.6, 0)) } : wide
    }),
  ]

  let target = 0, progress = 0 // target comes from scroll; progress eases toward it every frame
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return // touch would yank the camera at the start of every swipe
    mouse.tx = e.clientX / innerWidth - 0.5
    mouse.ty = e.clientY / innerHeight - 0.5
  }
  addEventListener('pointermove', onMove, { passive: true })

  let W = 1, H = 1
  const resize = () => {
    W = canvas.clientWidth; H = canvas.clientHeight
    small = W < 1024
    renderer.setSize(W, H, false)
    camera.aspect = W / H
    camera.fov = small ? 55 : 42
    // On wide screens shift the scene right, so the cities sit beside the text column, not under it.
    if (small) camera.clearViewOffset()
    else camera.setViewOffset(W, H, -W * 0.17, 0, W, H)
    camera.updateProjectionMatrix()
  }
  resize()
  addEventListener('resize', resize)

  // Hold on each stop: between two chapters the camera only travels in the middle half of the scroll.
  const ease = (t: number) => t * t * (3 - 2 * t)
  const hold = (f: number) => ease(Math.min(Math.max((f - 0.25) / 0.5, 0), 1))
  const pos = new Vector3(), look = new Vector3(), tmp = new Vector3()
  let running = true, raf = 0, last = 0
  const t0 = performance.now()

  function frame(now: number) {
    if (!running) return
    raf = requestAnimationFrame(frame)
    const dt = Math.min((now - (last || now)) / 1000, 0.1)
    last = now
    progress += (target - progress) * (1 - Math.exp(-dt * 6))
    const time = (now - t0) / 1000
    ;(ground.material as ShaderMaterial).uniforms.uTime!.value = time

    const i = Math.max(0, Math.min(Math.floor(progress), keys.length - 2))
    const f = i === 0 ? ease(Math.min(Math.max(progress, 0), 1)) : hold(progress - i)
    pos.lerpVectors(keys[i]!.pos, keys[i + 1]!.pos, f)
    look.lerpVectors(keys[i]!.look, keys[i + 1]!.look, f)
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    camera.position.set(pos.x + mouse.x * 1.2, pos.y - mouse.y * 0.6, pos.z)
    camera.lookAt(look)

    arcs.forEach((a, k) => a.line.geometry.setDrawRange(0, Math.round(a.total * Math.min(Math.max(progress - (arcStep[k + 1]! - 1), 0), 1))))
    const tw = Math.min(Math.max((progress - (wideAt - 0.6)) * 2, 0), 1)
    travelArcs.forEach(a => a.line.geometry.setDrawRange(0, Math.round(a.total * tw)))

    const active = progress > 0.75 ? steps[Math.max(0, Math.min(steps.length, Math.round(progress)) - 1)]?.focus : undefined
    for (const b of beacons) {
      const on = b.id === active
      b.sprite.scale.setScalar(b.base * (on ? 1.3 + Math.sin(time * 2.5) * 0.08 : 1))
      tmp.copy(at[b.id]!).setY(b.kind === 'journey' ? 1.3 : 0.6).project(camera)
      const x = ((tmp.x + 1) / 2) * W, y = ((1 - tmp.y) / 2) * H
      const inView = tmp.z < 1 && x > 48 && x < W - 48 && y > 72 && y < H - 96
      const show = inView && progress > 0.75 && (b.kind === 'journey' || (progress > wideAt - 0.4 && !small))
      if (show !== b.shown) { b.el.style.opacity = show ? '1' : '0'; b.shown = show }
      if (show) b.el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -100%)`
      if (b.el.classList.contains('on') !== on) b.el.classList.toggle('on', on)
    }
    renderer.render(scene, camera)
  }
  renderer.compile(scene, camera) // compile shaders now, not on the first scroll frame
  raf = requestAnimationFrame(frame)

  const pause = () => { running = false; cancelAnimationFrame(raf) }
  const resume = () => { if (!running) { running = true; last = 0; raf = requestAnimationFrame(frame) } }
  let paused = false
  const vis = () => (document.hidden ? pause() : !paused && resume())
  document.addEventListener('visibilitychange', vis)

  return {
    setProgress(p) { target = p },
    pause() { paused = true; pause() },
    resume() { paused = false; resume() },
    destroy() {
      pause()
      removeEventListener('pointermove', onMove)
      removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', vis)
      scene.traverse(o => {
        const m = o as unknown as { geometry?: BufferGeometry; material?: Material }
        m.geometry?.dispose()
        m.material?.dispose()
      })
      tex.dispose()
      labels.replaceChildren()
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
