import { execa } from 'execa'

describe('node', function () {
  // slow CI is slow
  this.timeout(540000)
  this.slow(60000)

  it('should match output', async () => {
    await execa('./bin/test-node-example.js', [
      './test/fixtures/node/match-output.spec.js'
    ], {
      stdio: 'inherit'
    })
  })

  it('should wait for output', async () => {
    await execa('./bin/test-node-example.js', [
      './test/fixtures/node/wait-for-output.spec.js'
    ], {
      stdio: 'inherit'
    })
  })
})
