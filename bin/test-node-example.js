#! /usr/bin/env node
/* eslint-disable no-console */

import { execa } from 'execa'

for (const file of process.argv.slice(2)) {
  // run test
  await execa('node', [file], {
    stdio: 'inherit'
  })
}
