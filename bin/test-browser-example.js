#! /usr/bin/env node
/* eslint-disable no-console */

import { execa } from 'execa'

// install deps
await execa('npx', ['-y', 'playwright', 'install', '--with-deps'], {
  stdio: 'inherit'
})

// run tests
await execa('npx', ['playwright', 'test', ...process.argv.slice(2)], {
  stdio: 'inherit'
})
