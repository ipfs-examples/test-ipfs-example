
import { execa, type ExecaChildProcess, type Options } from 'execa'

function execaUtil (command: string, args: string[] = [], opts: Options<string> = {}, callback?: (proc: ExecaChildProcess<string>) => void): ExecaChildProcess<string> {
  if (command.endsWith('.js')) {
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
