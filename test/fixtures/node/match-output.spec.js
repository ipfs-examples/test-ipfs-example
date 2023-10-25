import { matchOutput } from '../../../dist/src/node/index.js'

const result = await matchOutput(/(Here is some input)/mg, './test/fixtures/node/index.js')

result.process.kill()
