#! /usr/bin/env node
/* eslint-disable no-console */

import { execa } from 'execa'

try {
  // install deps
  await execa('npx', ['-y', 'playwright', 'install', '--with-deps'], {
    stdio: 'inherit'
  })
} catch (err) {
  if (!err.message.includes('Could not get lock')) {
    throw err
  }
}

for (const file of process.argv.slice(2)) {
  // run test
  await execa('npx', ['playwright', 'test', file], {
    stdio: 'inherit'
  })
}
