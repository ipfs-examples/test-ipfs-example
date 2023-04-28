#! /usr/bin/env node
/* eslint-disable no-console */

import { execa } from 'execa'

// run tests
await execa('node', [...process.argv.slice(2)], {
  stdio: 'inherit'
})
