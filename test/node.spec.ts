import { execa } from 'execa'

describe('node', () => {
  it('should have node success', async () => {
    await execa('./bin/test-node-example.js', [
      './test/fixtures/node/test.spec.js'
    ], {
      stdio: 'inherit'
    })
  })
})
