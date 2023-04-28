import { expect } from 'aegir/chai'
import { waitForOutput } from '../src/node/index.js'

describe('node', () => {
  it('should have node success', async () => {
    await waitForOutput('Here is some output', './dist/test/fixtures/node/index.js')
  })

  it('should have node failure', async () => {
    await expect(waitForOutput('Some text that is not in the output', './dist/test/fixtures/node/index.js'))
      .to.eventually.be.rejected.with.property('message').that.include('Did not see')
  })

  it('should have node success for long running processes', async () => {
    await waitForOutput('Here is some output', './dist/test/fixtures/node/unending.js')
  })

  it('should have node failure for long running processes', async () => {
    await expect(waitForOutput('Some text that is not in the output', './dist/test/fixtures/node/unending.js', [], {
      timeout: 1000
    }))
      .to.eventually.be.rejected.with.property('message').that.include('Did not see')
  })
})
