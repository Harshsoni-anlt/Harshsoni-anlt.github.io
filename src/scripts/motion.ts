// Page motion: smooth scroll, kinetic hero, the pinned journey that flies the 3D camera, reveals,
// magnetic buttons and hover-play demos. Under reduced motion none of this runs and the page is complete as HTML.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { JOURNEY, PLACES } from '../data/places'

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = matchMedia('(pointer: fine)').matches

function webglOk() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

// Hover-play demo videos run even under reduced motion: they only play on explicit hover/focus/tap.
function demos() {
  document.querySelectorAll<HTMLElement>('[data-demo]').forEach(card => {
    const v = card.querySelector('video')
    if (!v) return
    const play = () => { v.preload = 'auto'; v.play().catch(() => {}); card.classList.add('playing') }
    const stop = () => { v.pause(); card.classList.remove('playing') }
    card.addEventListener('pointerenter', play)
    card.addEventListener('pointerleave', stop)
    card.addEventListener('focusin', play)
    card.addEventListener('focusout', stop)
    if (!finePointer) {
      // On touch, play while the card is on screen.
      new IntersectionObserver(([e]) => (e!.isIntersecting ? play() : stop()), { threshold: 0.6 }).observe(card)
    }
  })
}

function splitChars(el: HTMLElement) {
  const text = el.textContent ?? ''
  el.setAttribute('aria-label', text)
  el.innerHTML = text
    .split(' ')
    .map(w => `<span class="w" aria-hidden="true">${[...w].map(c => `<span class="c">${c}</span>`).join('')}</span>`)
    .join(' ')
  return el.querySelectorAll('.c')
}

async function init() {
  demos()
  if (reduced) return
  document.documentElement.classList.add('motion')
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(t => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach(a =>
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')!.replace(/^\//, '')
      const t = document.querySelector(id)
      if (t && location.pathname === '/') { e.preventDefault(); lenis.scrollTo(t as HTMLElement, { offset: -60 }) }
    }),
  )

  // Kinetic hero.
  const name = document.querySelector<HTMLElement>('[data-split]')
  if (name) gsap.from(splitChars(name), { yPercent: 110, opacity: 0, rotate: 6, duration: 0.9, ease: 'expo.out', stagger: 0.035, delay: 0.15 })
  gsap.from('[data-hero-in]', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.5 })

  // Rotating word in the hero line.
  const rot = document.querySelector<HTMLElement>('[data-rotate]')
  if (rot) {
    const words = (rot.dataset.rotate ?? '').split('|')
    let k = 0
    setInterval(() => {
      k = (k + 1) % words.length
      gsap.to(rot, { yPercent: -60, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
        rot.textContent = words[k]!
        gsap.fromTo(rot, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
      } })
    }, 2600)
  }

  // Section reveals.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el =>
    gsap.from(el, { y: 48, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }),
  )
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(el =>
    gsap.from(el.children, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 80%' } }),
  )

  // Magnetic buttons.
  if (finePointer) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(b => {
      const x = gsap.quickTo(b, 'x', { duration: 0.4, ease: 'power3' })
      const y = gsap.quickTo(b, 'y', { duration: 0.4, ease: 'power3' })
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect()
        x((e.clientX - r.left - r.width / 2) * 0.3)
        y((e.clientY - r.top - r.height / 2) * 0.4)
      })
      b.addEventListener('pointerleave', () => { x(0); y(0) })
    })
  }

  // The 3D world: loaded after first paint, only with WebGL, never blocking content.
  const canvas = document.querySelector<HTMLCanvasElement>('#world')
  const labels = document.querySelector<HTMLElement>('#world-labels')
  const journey = document.querySelector<HTMLElement>('#journey')
  if (!canvas || !labels || !journey || !webglOk() || (navigator as any).connection?.saveData) return
  const { startWorld } = await import('./world')
  const world = startWorld(canvas, labels, PLACES, JOURNEY)
  document.documentElement.classList.add('world-on')

  // Hero → journey: overview camera drifts as the hero scrolls away.
  ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: s => world.setProgress(s.progress * 0.6) })

  // Pinned journey: each step owns an equal slice of the scroll; the camera flies between them.
  const steps = gsap.utils.toArray<HTMLElement>('.step')
  const n = steps.length
  ScrollTrigger.create({
    trigger: journey,
    start: 'top top',
    end: () => `+=${innerHeight * n * 0.9}`,
    pin: true,
    scrub: 0.6,
    onUpdate: s => {
      const p = 0.6 + s.progress * (n - 0.6)
      world.setProgress(p)
      const idx = Math.min(n - 1, Math.floor(s.progress * n))
      steps.forEach((el, i) => el.classList.toggle('active', i === idx))
      journey.style.setProperty('--jp', String(s.progress))
    },
  })

  // The world fades out once the journey is over, so the rest of the page reads on a calm background.
  const fade = { trigger: '#capabilities', start: 'top bottom', end: 'top 30%', scrub: true }
  gsap.to('#world-wrap', { opacity: 0.18, ease: 'none', scrollTrigger: fade })
  gsap.to('#world-labels', { opacity: 0, ease: 'none', scrollTrigger: { ...fade, end: 'top 70%' } })
}

init()
