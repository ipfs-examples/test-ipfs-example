import { execa } from 'execa'

describe('browser', () => {
  it('should have browser success', async () => {
    await execa('./bin/test-browser-example.js', [
      './test/fixtures/browser/test.spec.js'
    ], {
      stdio: 'inherit'
    })
  })
})
