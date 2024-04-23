#! /usr/bin/env node
/* eslint-disable no-console */

import { execa } from 'execa'

for (const file of process.argv.slice(2)) {
  // run test
  await execa(process.env.NODE_EXEC ?? 'node', [file], {
    stdio: 'inherit'
  })
}
