import pDefer from 'p-defer'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import execaUtil from './execa.js'
import type { DefaultEncodingOption, EncodingOption, ExecaChildProcess, Options } from 'execa'

export interface WaitForOutputOptions<EncodingType extends EncodingOption = DefaultEncodingOption> extends Options<EncodingType> {
  timeout?: number
}

export interface MatchOutputResult {
  matches: string[]
  process: ExecaChildProcess<string>
}

/**
 * Starts a process and matches the output against the passed regex. The match
 * result and process are returned, the user must manually kill the process
 * when they are finished with it.
 */
export async function matchOutput (matcher: RegExp, command: string, args: string[] = [], opts: WaitForOutputOptions = {}): Promise<MatchOutputResult> {
  const foundMatch = pDefer<string[]>()

  const proc = execaUtil(command, args, { ...opts, all: true }, (exec) => {
    exec.all?.on('data', (data) => {
      process.stdout.write(data)

      output += typeof data === 'string' ? data : uint8ArrayToString(data)

      const matches = matcher.exec(output)

      if (matches == null) {
        return
      }

      foundExpectedOutput = true
      foundMatch.resolve(matches)
      cancelTimeout()
    })
  })

  let output = ''
  const time = opts.timeout ?? 120000

  let foundExpectedOutput = false
  let cancelTimeout = (): void => {}
  const timeoutPromise = new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(
        new Error(
          `Did not match "${matcher}" in output from "${[command]
            .concat(args)
            .join(' ')}" after ${time / 1000}s`
        )
      )

      setTimeout(() => {
        proc.kill()
      }, 100)
    }, time)

    cancelTimeout = () => {
      clearTimeout(timeout)
      resolve()
    }
  })

  let result: string[] | undefined

  try {
    const res = await Promise.race([foundMatch.promise, timeoutPromise])

    if (res != null) {
      result = res
    }
  } catch (err: any) {
    if (err.killed == null) {
      throw err
    }
  }

  if (!foundExpectedOutput) {
    cancelTimeout()
    throw new Error(
      `Did not match "${matcher}" in output from "${[command]
        .concat(args)
        .join(' ')}"`
    )
  }

  if (result == null) {
    throw new Error('Process output was undefined')
  }

  return {
    process: proc,
    matches: result
  }
}
