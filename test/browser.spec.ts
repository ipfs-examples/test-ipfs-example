import { expect } from 'aegir/chai'
import { execa } from 'execa'

describe('browser', () => {
  it('should have browser success', async () => {
    const output = await execa('playwright', ['test', 'test/fixtures/browser/test.spec.js'])

    expect(output).to.have.property('stdout').that.includes('1 passed')
  })
})
