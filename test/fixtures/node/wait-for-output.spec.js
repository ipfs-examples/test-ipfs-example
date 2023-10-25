import { waitForOutput } from '../../../dist/src/node/index.js'

await waitForOutput('Here is some output', './test/fixtures/node/index.js')
