// JS-off check on the built site: a recruiter with scripts blocked (or a résumé crawler) must still
// find the résumé, every contact route and every project, and nothing private may leak.
import { readFileSync, readdirSync } from 'node:fs'

const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
const quests = readdirSync(new URL('../src/content/quests/', import.meta.url))
const titles = quests.map(f => readFileSync(new URL(`../src/content/quests/${f}`, import.meta.url), 'utf8').match(/^title: (.+)$/m)[1])

const must = [/href="\/resume(\.pdf|\/)"/, /href="mailto:/, /linkedin\.com\/in\/harsh--soni/, /github\.com\/Harshsoni-anlt/, ...titles.map(t => new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))]
const mustNot = [/\+91|63785|76653/, /Confidential/i] // phone number and the résumé's "Confidential" footer stay off the site

const missing = must.filter(r => !r.test(home)).map(String)
const leaked = mustNot.filter(r => r.test(home)).map(String)
missing.forEach(m => console.log('MISSING on /:', m))
leaked.forEach(m => console.log('LEAKED on /:', m))
console.log(missing.length || leaked.length ? 'html check failed' : `html check: résumé, email, LinkedIn, GitHub and ${titles.length} projects present without JS; nothing private`)
process.exit(missing.length || leaked.length ? 1 : 0)
