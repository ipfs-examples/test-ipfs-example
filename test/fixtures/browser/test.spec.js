import { setup, expect } from '../../../dist/src/browser/index.js'

const test = setup({
  servers: [{
    path: './test/fixtures/browser'
  }]
})

test.describe('test a browser app', () => {
  test.beforeEach(async ({ servers, page }) => {
    await page.goto(servers[0].url)
  })

  test('should have browser success', async ({ page }) => {
    await page.waitForSelector('#app')
    const connections = await page.textContent('#app')
    expect(connections).toContain('hello world')
  })
})
