
export { default as servers } from './servers.js'
export { default as daemons } from './daemons.js'

import { test, expect } from '@playwright/test'
import { playwright } from 'test-util-ipfs-example'

// Setup
const play = test.extend({
  ...playwright.servers()
})

export { play }
export { test }
export { expect }
