import { execa } from 'execa'

describe('browser', function () {
  // slow CI is slow
  this.timeout(540000)
  this.slow(60000)

  it('should have browser success', async () => {
    await execa('./bin/test-browser-example.js', [
      './test/fixtures/browser/test.spec.js'
    ], {
      stdio: 'inherit'
    })
  })
})
