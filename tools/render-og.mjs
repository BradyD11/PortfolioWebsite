/**
 * Renders tools/og-card.html to public/og.png at exactly 1200x630.
 *
 * Requires Chrome and puppeteer-core:  npm i -D puppeteer-core
 */
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
await page.goto(`file://${resolve(here, 'og-card.html')}`, { waitUntil: 'domcontentloaded' })
await page.evaluate(() => document.fonts.ready)
await new Promise((r) => setTimeout(r, 1800)) // let webfonts paint
await page.screenshot({
  path: resolve(here, '..', 'public', 'og.png'),
  clip: { x: 0, y: 0, width: 1200, height: 630 },
})
await browser.close()
console.log('public/og.png written (1200x630)')
