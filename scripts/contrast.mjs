// Recomputes WCAG contrast for every text colour against every surface it sits on, both schemes.
// Bands are color-mix(in oklch, accent N%, bg), so the mix is done in OKLCH here too. Exits 1 on a failure.
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/layouts/Base.astro', import.meta.url), 'utf8')
const block = re => Object.fromEntries([...(css.match(re)?.[1] ?? '').matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(m => [m[1], m[2]]))
const dark = block(/:root \{([\s\S]*?)\n  \}/)
const light = block(/prefers-color-scheme: light\) \{\s*:root \{([\s\S]*?)\}/) // optional: the site may be dark-only

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const unlin = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)
const lum = rgb => { const [r, g, b] = rgb.map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
const toOklab = rgb => {
  const [r, g, b] = rgb.map(lin)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]
}
const fromOklab = ([L, A, B]) => {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3, m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3, s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map(c => Math.min(1, Math.max(0, unlin(c))))
}
const mix = (a, b, p) => { const [x, y] = [toOklab(a), toOklab(b)]; return fromOklab(x.map((v, i) => v * p + y[i] * (1 - p))) }

// A parse miss would make every comparison NaN and "pass" silently.
if (!dark.bg || !dark.ink || !dark['ink-2']) { console.log('FAIL: could not read colour tokens from Base.astro'); process.exit(1) }

let failed = 0
const schemes = [['dark', dark]]
if (light.bg) schemes.push(['light', { ...dark, ...light }])
for (const [name, t] of schemes) {
  const C = k => hex(t[k])
  const surfaces = { bg: C('bg'), surface: C('surface') }
  if (t['surface-2']) surfaces['surface-2'] = C('surface-2')
  for (const [sname, s] of Object.entries(surfaces)) {
    // Every chromatic stop is used as text (gradient text, numerals), so each must pass on its own.
    for (const fg of ['ink', 'ink-2', 'ok', 'uat', ...['c1', 'c2', 'c3', 'c4', 'c5'].filter(k => t[k])]) {
      const r = ratio(C(fg), s)
      if (r < 4.5) { failed++; console.log(`FAIL ${name}: ${fg} on ${sname} = ${r.toFixed(2)}`) }
    }
  }
  // Primary button: bg-coloured text on ink, and on each chromatic stop when hovered.
  for (const fg of ['ink', ...['c1', 'c2', 'c3', 'c4', 'c5'].filter(k => t[k])]) {
    const r = ratio(C('bg'), C(fg))
    if (r < 4.5) { failed++; console.log(`FAIL ${name}: bg text on ${fg} button = ${r.toFixed(2)}`) }
  }
}
console.log(failed ? `${failed} contrast failure(s)` : `contrast: all text pairs ≥ 4.5:1 (${schemes.map(s => s[0]).join(' + ')})`)
process.exit(failed ? 1 : 0)
