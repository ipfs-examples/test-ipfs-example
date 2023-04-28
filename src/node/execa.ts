
import fs from 'node:fs'
import { execa, type ExecaChildProcess, type Options } from 'execa'
import which from 'which'

function isExecutable (command: string): boolean {
  try {
    fs.accessSync(command, fs.constants.X_OK)
    return true
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return isExecutable(which.sync(command))
    }

    if (err.code === 'EACCES') {
      return false
    }

    throw err
  }
}

function execaUtil (command: string, args: string[] = [], opts: Options<string> = {}, callback?: (proc: ExecaChildProcess<string>) => void): ExecaChildProcess<string> {
  if (!isExecutable(command)) {
    args.unshift(command)
    command = 'node'
  }

  const proc = execa(command, args, { ...opts, all: true })

  if (callback != null) {
    callback(proc)
  }

  return proc
}

export default execaUtil
