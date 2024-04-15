import { platform } from 'node:os'
import { execa } from 'execa'

describe('bun', function () {
  // slow CI is slow
  this.timeout(540000)
  this.slow(60000)

  it('should match output', async () => {
    await execa('./bin/test-node-example.js', [
      './test/fixtures/node/match-output.spec.js'
    ], {
      stdio: 'inherit',
      env: {
        NODE_EXEC: 'bun'
      }
    })
  })

  it('should wait for output', async () => {
    await execa('./bin/test-node-example.js', [
      './test/fixtures/node/wait-for-output.spec.js'
    ], {
      stdio: 'inherit',
      env: {
        NODE_EXEC: 'bun'
      }
    })
  })

  it('should test multiple files', async () => {
    await execa('./bin/test-node-example.js', [
      './test/fixtures/node/wait-for-output.spec.js',
      './test/fixtures/node/match-output.spec.js'
    ], {
      stdio: 'inherit',
      env: {
        NODE_EXEC: 'bun'
      }
    })
  })
})
