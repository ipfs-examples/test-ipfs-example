import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import execaUtil from './execa.js'
import type { DefaultEncodingOption, EncodingOption, Options } from 'execa'

export interface WaitForOutputOptions<EncodingType extends EncodingOption = DefaultEncodingOption> extends Options<EncodingType> {
  timeout?: number
}

/**
 * Starts a process and waits for the passed string to appear in the output.
 * When this happens the process is killed.
 */
export async function waitForOutput (expectedOutput: string, command: string, args: string[] = [], opts: WaitForOutputOptions = {}): Promise<void> {
  const proc = execaUtil(command, args, { ...opts, all: true }, (exec) => {
    exec.all?.on('data', (data) => {
      process.stdout.write(data)
      output += typeof data === 'string' ? data : uint8ArrayToString(data)

      if (output.includes(expectedOutput)) {
        foundExpectedOutput = true
        exec.kill()
        cancelTimeout()
      }
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
          `Did not see "${expectedOutput}" in output from "${[command]
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

  try {
    await Promise.race([proc, timeoutPromise])
  } catch (err: any) {
    if (err.killed == null) {
      throw err
    }
  }

  if (!foundExpectedOutput) {
    cancelTimeout()
    throw new Error(
      `Did not see "${expectedOutput}" in output from "${[command]
        .concat(args)
        .join(' ')}"`
    )
  }
}
