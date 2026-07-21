// Smoke-drive the portfolio: boot → story → acts → palette. Screenshots to OUT.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const OUT = process.env.OUT ?? './shots'
const URL = process.env.URL ?? 'http://localhost:5173/saksham-portfolio/'
mkdirSync(OUT, { recursive: true })

const errors = []
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(URL, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1800)
await page.screenshot({ path: `${OUT}/01-boot-typing.png` })
await page.waitForTimeout(3200)
await page.screenshot({ path: `${OUT}/02-boot-ready.png` })

// begin the film (cinematic path)
await page.keyboard.press('Enter')
await page.waitForTimeout(2200)
await page.screenshot({ path: `${OUT}/03-hero.png` })

// scroll through acts
const scrollShot = async (sel, name, extra = 0) => {
  await page.evaluate(([s, dy]) => {
    const el = document.querySelector(s)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + dy, behavior: 'instant' })
  }, [sel, extra])
  await page.waitForTimeout(1400)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

await scrollShot('#act-1', '04-act1-title')
await scrollShot('#act-1', '05-act1-cards', 900)
await scrollShot('#act-2', '06-act2-title')
await scrollShot('#barclays', '07-act2-barclays', -60)
await scrollShot('#act-3', '08-act3-title')
// pinned centerpiece: scroll into pin range
await page.evaluate(() => {
  const el = document.querySelector('#act-3')
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + window.innerHeight * 2.2, behavior: 'instant' })
})
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/09-act3-eval.png` })
await scrollShot('#act-4', '10-act4-title')
await scrollShot('#contact', '11-contact')

// palette
await page.keyboard.press('Control+k')
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/12-palette.png` })
await page.keyboard.type('barc')
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/13-palette-search.png` })
await page.keyboard.press('Escape')

// mobile viewport check
const mp = await browser.newPage({ viewport: { width: 390, height: 844 } })
mp.on('pageerror', (e) => errors.push('mobile: ' + String(e)))
await mp.goto(URL, { waitUntil: 'domcontentloaded' })
await mp.waitForTimeout(5200)
await mp.screenshot({ path: `${OUT}/14-mobile-boot.png` })
await mp.tap('body').catch(() => {})
await mp.keyboard.press('Enter')
await mp.waitForTimeout(1800)
await mp.screenshot({ path: `${OUT}/15-mobile-hero.png` })
await mp.evaluate(() => document.querySelector('#barclays')?.scrollIntoView())
await mp.waitForTimeout(1200)
await mp.screenshot({ path: `${OUT}/16-mobile-act2.png` })

// reduced motion check
const rm = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })
const rp = await rm.newPage()
rp.on('pageerror', (e) => errors.push('reduced: ' + String(e)))
await rp.goto(URL, { waitUntil: 'domcontentloaded' })
await rp.waitForTimeout(800)
await rp.screenshot({ path: `${OUT}/17-reduced-boot.png` })
await rp.keyboard.press('Enter')
await rp.waitForTimeout(800)
await rp.evaluate(() => document.querySelector('#act-2')?.scrollIntoView())
await rp.waitForTimeout(500)
await rp.screenshot({ path: `${OUT}/18-reduced-act2.png` })

// resume page
await page.goto(URL + 'resume.html', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/19-resume.png`, fullPage: false })

console.log('CONSOLE/PAGE ERRORS:', errors.length ? errors : 'none')
await browser.close()
