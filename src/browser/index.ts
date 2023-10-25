import { test, expect, type TestType, type PlaywrightTestArgs, type PlaywrightWorkerArgs, type PlaywrightWorkerOptions } from '@playwright/test'
import { servers } from './servers.js'

export interface ServerConfig {
  port?: number
  host?: string
  path: string
}

export interface TestOptions {
  servers?: ServerConfig[]
  explicitStop?: boolean
}

export interface ServerFixture {
  server: any
  url: string
  stop(): Promise<void>
}

export interface TestArgs extends PlaywrightTestArgs {
  servers: ServerFixture[]
}

export type BrowserTest = TestType<TestArgs, PlaywrightWorkerArgs & PlaywrightWorkerOptions>

export function setup (opts: TestOptions = {}): BrowserTest {
  return test.extend({
    ...servers(opts.servers ?? [], opts.explicitStop ?? false)
  })
}

export { expect }
