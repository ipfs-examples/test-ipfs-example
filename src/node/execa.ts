import { execa, type ExecaChildProcess, type Options, type DefaultEncodingOption } from 'execa'

function execaUtil (command: string, args: string[], opts: Options<'buffer'>, callback?: (proc: ExecaChildProcess<Buffer>) => void): ExecaChildProcess<Buffer>
function execaUtil (command: string, args?: string[], opts?: Options<DefaultEncodingOption>, callback?: (proc: ExecaChildProcess<string>) => void): ExecaChildProcess<string>
function execaUtil (command: string, args: string[] = [], opts: any = {}, callback?: (proc: any) => void): any {
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
