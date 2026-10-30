// Page motion: smooth scroll, hero reveal, the pinned journey that flies the 3D camera, reveals,
// magnetic buttons and demo playback. Under reduced motion none of this runs and the page is complete as HTML.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { JOURNEY, PLACES } from '../data/places'
import type { World } from './world'

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = matchMedia('(pointer: fine)').matches

function webglOk() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

// Demo videos: hover/focus plays on desktop; on touch, only the card crossing the middle of the screen plays.
function demos() {
  document.querySelectorAll<HTMLElement>('[data-demo]').forEach(card => {
    const v = card.querySelector('video')
    if (!v) return
    const play = () => { v.preload = 'auto'; v.play().catch(() => {}); card.classList.add('playing') }
    const stop = () => { v.pause(); v.currentTime = 0; card.classList.remove('playing') }
    if (finePointer) {
      card.addEventListener('pointerenter', play)
      card.addEventListener('pointerleave', stop)
      card.addEventListener('focusin', play)
      card.addEventListener('focusout', stop)
    } else if (!reduced) {
      new IntersectionObserver(([e]) => (e!.isIntersecting ? play() : stop()), { rootMargin: '-45% 0px -45% 0px' }).observe(card)
    }
  })
}

function init() {
  demos()
  if (reduced) return
  // The pin changes the page height after load, so the browser's own restore lands in the wrong place.
  history.scrollRestoration = 'manual'
  addEventListener('pagehide', () => { try { sessionStorage.setItem('y', String(scrollY)) } catch {} })

  document.documentElement.classList.add('motion')
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(t => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(500, 33)

  // Anchor links: smooth when close, instant when far (no whip through the whole journey).
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach(a =>
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')!.replace(/^\//, '')
      const t = document.querySelector<HTMLElement>(id)
      if (!t || location.pathname !== '/') return
      e.preventDefault()
      lenis.scrollTo(t, { offset: -64, immediate: Math.abs(t.getBoundingClientRect().top) > innerHeight * 3 })
    }),
  )

  // Freeze the page while the terminal dialog is open.
  const dlg = document.getElementById('wizard')
  if (dlg) new MutationObserver(() => (dlg.hasAttribute('open') ? lenis.stop() : lenis.start())).observe(dlg, { attributes: true, attributeFilter: ['open'] })

  // Hero: the name rises in as one piece so its gradient stays continuous.
  const name = document.querySelector<HTMLElement>('[data-split]')
  if (name) gsap.from(name, { yPercent: 30, opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 1.3, ease: 'expo.out', delay: 0.1 })
  gsap.from('[data-hero-in]', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.45 })

  // Rotating word. The longest word reserves the space (see .rot-size), so nothing around it moves.
  const rot = document.querySelector<HTMLElement>('[data-rotate]')
  if (rot) {
    const words = (rot.dataset.rotate ?? '').split('|')
    let k = 0
    setInterval(() => {
      if (document.hidden) return
      k = (k + 1) % words.length
      gsap.to(rot, { yPercent: -60, opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: true, onComplete: () => {
        rot.textContent = words[k]!
        gsap.fromTo(rot, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out', overwrite: true })
      } })
    }, 2800)
  }

  // Magnetic buttons: the rect is read once on enter, so the transform never feeds back into itself.
  if (finePointer) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(b => {
      const x = gsap.quickTo(b, 'x', { duration: 0.4, ease: 'power3' })
      const y = gsap.quickTo(b, 'y', { duration: 0.4, ease: 'power3' })
      let r = b.getBoundingClientRect()
      b.addEventListener('pointerenter', () => { gsap.set(b, { x: 0, y: 0 }); r = b.getBoundingClientRect() })
      b.addEventListener('pointermove', e => { x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35) })
      b.addEventListener('pointerleave', () => { x(0); y(0) })
    })
  }

  // ── The journey. Pinned only when the 3D world can run; otherwise it stays a readable list. ──
  const journey = document.querySelector<HTMLElement>('#journey')
  const canvas = document.querySelector<HTMLCanvasElement>('#world')
  const labels = document.querySelector<HTMLElement>('#world-labels')
  const canWorld = !!(journey && canvas && labels && webglOk() && !(navigator as any).connection?.saveData)
  let world: World | null = null
  let progress = 0 // one number drives camera, card and highlighted city
  const steps = gsap.utils.toArray<HTMLElement>('.step')
  const n = steps.length

  if (canWorld) {
    document.documentElement.classList.add('world-on')
    ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom top', onUpdate: s => { progress = s.progress * 0.6; world?.setProgress(progress) } })
    ScrollTrigger.create({
      trigger: journey,
      start: 'top top',
      // Phones get a shorter story: half a screen per chapter instead of almost a full one.
      end: () => `+=${innerHeight * n * (finePointer ? 0.85 : 0.45)}`,
      pin: true,
      onUpdate: s => {
        progress = 0.6 + s.progress * (n - 0.2)
        world?.setProgress(progress)
        const idx = Math.max(0, Math.min(n - 1, Math.round(progress) - 1))
        steps.forEach((el, i) => el.classList.toggle('active', i === idx))
        journey!.style.setProperty('--jp', String(s.progress))
      },
    })
    const fade = { trigger: '#capabilities', start: 'top bottom', end: 'top 35%', scrub: true }
    gsap.to('#world-wrap', { opacity: 0, ease: 'none', scrollTrigger: fade })
    // Stop rendering once the world has faded out; resume when scrolling back up.
    ScrollTrigger.create({ trigger: '#capabilities', start: 'top 35%', onEnter: () => world?.pause(), onLeaveBack: () => world?.resume() })
  }

  // Reveals are created after the pin, so their positions include the pin's spacing.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el =>
    gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }),
  )
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(el =>
    gsap.from(el.children, { y: 32, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 82%' } }),
  )
  ScrollTrigger.sort()
  ScrollTrigger.refresh()
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  // Restore the reading position after a reload, now that the page has its real height.
  try {
    const y = +(sessionStorage.getItem('y') ?? 0)
    if (y) requestAnimationFrame(() => lenis.scrollTo(y, { immediate: true }))
  } catch {}

  // Boot the 3D world when the browser is idle, so the hero intro never stutters.
  if (canWorld) {
    const idle = () => new Promise(r => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(r, { timeout: 1500 }) : setTimeout(r, 1200)))
    idle()
      .then(() => import('./world'))
      .then(({ startWorld }) => {
        world = startWorld(canvas!, labels!, PLACES, JOURNEY)
        world.setProgress(progress)
        if (document.querySelector('#capabilities')!.getBoundingClientRect().top < innerHeight * 0.35) world.pause()
        document.documentElement.classList.add('world-live')
      })
  }
}

init()
