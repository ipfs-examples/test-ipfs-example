import { execa } from 'execa'

describe('node', function () {
  // slow CI is slow
  this.timeout(540000)
  this.slow(60000)

  it('should have node success', async () => {
    await execa('./bin/test-node-example.js', [
      './test/fixtures/node/test.spec.js'
    ], {
      stdio: 'inherit'
    })
  })
})
