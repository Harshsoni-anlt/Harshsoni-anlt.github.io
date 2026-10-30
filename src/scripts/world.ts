// The journey world: an abstract particle terrain with real-coordinate beacons (no borders drawn),
// arcs that draw themselves along the journey, and a camera driven by scroll progress.
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, Group, Line, LineBasicMaterial,
  PerspectiveCamera, Points, QuadraticBezierCurve3, Scene, ShaderMaterial, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three'
import type { Place } from '../data/places'

type Step = { focus: string }
export type World = { setProgress(p: number): void; destroy(): void }

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
  grd.addColorStop(0.18, 'rgba(255,255,255,.85)')
  grd.addColorStop(0.45, 'rgba(255,255,255,.18)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new CanvasTexture(c)
}

// Points on a grid, displaced in the vertex shader by a few moving sine octaves. Cheap, and it breathes.
function terrain(colors: Color[], small: boolean) {
  const n = small ? 110 : 170
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
      uSize: { value: small ? 3.8 : 4.6 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uSize;
      varying float vH; varying float vFade; varying float vX;
      void main() {
        vec3 p = position;
        float h = sin(p.x * .32 + uTime * .35) * .55 + cos(p.z * .27 - uTime * .28) * .5
                + sin((p.x + p.z) * .7 + uTime * .6) * .16 + cos(length(p.xz) * .45 - uTime * .5) * .3;
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
        float lift = smoothstep(-.8, 1.4, vH);
        gl_FragColor = vec4(col * (.55 + lift * 1.1), (1.0 - d * 2.0) * vFade * (.38 + lift * .62));
      }`,
  })
  return new Points(geo, mat)
}

function arc(a: Vector3, b: Vector3, color: Color) {
  const mid = a.clone().lerp(b, 0.5).add(new Vector3(0, a.distanceTo(b) * 0.38, 0))
  const pts = new QuadraticBezierCurve3(a.clone().setY(0.15), mid, b.clone().setY(0.15)).getPoints(90)
  const geo = new BufferGeometry().setFromPoints(pts)
  geo.setDrawRange(0, 0)
  const line = new Line(geo, new LineBasicMaterial({ color, transparent: true, opacity: 0.95, blending: AdditiveBlending }))
  return { line, total: pts.length }
}

export function startWorld(canvas: HTMLCanvasElement, labels: HTMLElement, places: Place[], steps: readonly Step[]): World {
  const small = innerWidth < 760
  const renderer = new WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 1.75))
  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.1, 200)

  const hue = {
    kyndryl: new Color(css('--kyndryl', '#3DD6C4')), upl: new Color(css('--upl', '#F5B544')),
    oss: new Color(css('--oss', '#A78BFA')), frontier: new Color(css('--frontier', '#FF6FAE')),
  }
  const ground = terrain([hue.kyndryl, hue.oss, hue.frontier, hue.upl], small)
  scene.add(ground)

  // Beacons: a glow sprite plus a thin light pillar. Journey stops are bigger and coloured.
  const tex = glowTexture()
  const at: Record<string, Vector3> = {}
  const beacons: { id: string; sprite: Sprite; base: number; el: HTMLElement; kind: Place['kind'] }[] = []
  const warm = new Color('#FFE2B8')
  for (const p of places) {
    const v = toXZ(p)
    at[p.id] = v
    const color = p.hue ? hue[p.hue] : warm
    const g = new Group()
    g.position.copy(v)
    const big = p.kind === 'journey'
    const sprite = new Sprite(new SpriteMaterial({ map: tex, color, blending: AdditiveBlending, depthWrite: false, transparent: true }))
    const base = big ? 1.5 : 0.7
    sprite.scale.setScalar(base)
    sprite.position.y = big ? 0.5 : 0.3
    const pillar = new Line(
      new BufferGeometry().setFromPoints([new Vector3(0, -1.2, 0), new Vector3(0, big ? 2.4 : 1, 0)]),
      new LineBasicMaterial({ color, transparent: true, opacity: big ? 0.7 : 0.35, blending: AdditiveBlending }),
    )
    g.add(sprite, pillar)
    scene.add(g)
    const el = document.createElement('span')
    el.className = `w-label ${p.kind}`
    el.textContent = p.name
    labels.appendChild(el)
    beacons.push({ id: p.id, sprite, base, el, kind: p.kind })
  }

  const route = ['kota', 'mumbai', 'bengaluru'].filter(id => at[id])
  const arcs = route.slice(1).map((id, i) => arc(at[route[i]!]!, at[id]!, i === 0 ? hue.oss : hue.kyndryl))
  const travelArcs = places.filter(p => p.kind === 'travel').map(p => arc(at.bengaluru ?? new Vector3(), at[p.id]!, warm))
  for (const a of [...arcs, ...travelArcs]) scene.add(a.line)

  // Camera keyframes: index 0 is the hero overview, then one per journey step.
  const wide = { pos: new Vector3(0.6, 15, 15), look: new Vector3(-0.6, -1, -0.5) }
  const keys = [
    { pos: new Vector3(0, 7.5, 17), look: new Vector3(0, -0.5, -2) },
    ...steps.map(s => {
      const t = at[s.focus]
      return t ? { pos: t.clone().add(small ? new Vector3(0.4, 5, 7.5) : new Vector3(2.6, 4.2, 6.2)), look: t.clone().add(new Vector3(0, small ? -1.2 : 0, 0)) } : wide
    }),
  ]

  let progress = 0 // 0 = hero, 1..n = journey steps
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e: PointerEvent) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5 }
  addEventListener('pointermove', onMove, { passive: true })

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = w < 760 ? 55 : 42
    camera.updateProjectionMatrix()
  }
  resize()
  addEventListener('resize', resize)

  const ease = (t: number) => t * t * (3 - 2 * t)
  const pos = new Vector3(), look = new Vector3(), tmp = new Vector3()
  let running = true, raf = 0
  const t0 = performance.now()

  function frame(now: number) {
    if (!running) return
    raf = requestAnimationFrame(frame)
    const time = (now - t0) / 1000
    ;(ground.material as ShaderMaterial).uniforms.uTime!.value = time

    const i = Math.min(Math.floor(progress), keys.length - 2)
    const f = ease(Math.min(Math.max(progress - i, 0), 1))
    pos.lerpVectors(keys[i]!.pos, keys[i + 1]!.pos, f)
    look.lerpVectors(keys[i]!.look, keys[i + 1]!.look, f)
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    camera.position.set(pos.x + mouse.x * 1.6, pos.y - mouse.y * 0.9, pos.z)
    camera.lookAt(look)

    // Arcs draw along the journey: Kota→Mumbai over step 1→2, Mumbai→Bengaluru over 2→3; travel arcs at the wide view.
    arcs.forEach((a, k) => a.line.geometry.setDrawRange(0, Math.round(a.total * Math.min(Math.max(progress - (k + 1), 0), 1))))
    const tw = Math.min(Math.max(progress - 4.2, 0), 1)
    travelArcs.forEach(a => a.line.geometry.setDrawRange(0, Math.round(a.total * tw)))

    const active = steps[Math.round(Math.max(progress, 1)) - 1]?.focus
    const w = canvas.clientWidth, h = canvas.clientHeight
    for (const b of beacons) {
      const on = b.id === active
      b.sprite.scale.setScalar(b.base * (on ? 1.35 + Math.sin(time * 3) * 0.12 : 1))
      tmp.copy(at[b.id]!).setY(b.kind === 'journey' ? 1.3 : 0.8).project(camera)
      const visible = tmp.z < 1 && progress > 0.75 && (b.kind === 'journey' || progress > 4.2) // labels stay off the hero headline
      b.el.style.opacity = visible ? (on ? '1' : b.kind === 'travel' ? '.75' : '.85') : '0'
      b.el.style.transform = `translate(${((tmp.x + 1) / 2) * w}px, ${((1 - tmp.y) / 2) * h}px) translate(-50%, -100%)`
      b.el.classList.toggle('on', on)
    }
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)

  // Stop rendering when the tab is hidden.
  const vis = () => {
    if (document.hidden) { running = false; cancelAnimationFrame(raf) } else if (!running) { running = true; raf = requestAnimationFrame(frame) }
  }
  document.addEventListener('visibilitychange', vis)

  return {
    setProgress(p) { progress = p },
    destroy() {
      running = false
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', onMove)
      removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', vis)
      renderer.dispose()
    },
  }
}
