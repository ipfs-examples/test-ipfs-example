import polka from 'polka'
import sirv from 'sirv'
import stoppable from 'stoppable'
import type { ServerConfig, ServerFixture } from './index.js'
import type { Fixtures, WorkerFixture } from '@playwright/test'

const servers = (serverConfiguration: ServerConfig[] = [], explicitStop = false): Fixtures => {
  const servers: WorkerFixture<ServerFixture[], any> = async ({}, use) => { // eslint-disable-line no-empty-pattern
    const promiseServers = []
    const servers: ServerFixture[] = []
    const configurations: ServerConfig[] = [...serverConfiguration]

    if (configurations.length === 0) {
      configurations.push({
        path: 'dist'
      })
    }

    for (const configuration of configurations) {
      const port = configuration.port ?? 0
      const host = configuration.host ?? '127.0.0.1'

      // Setup polka app.
      const staticFiles = sirv(configuration.path, {
        maxAge: 31536000, // 1Y
        immutable: true
      })

      const app = polka()

      promiseServers.push((new Promise<void>((resolve, reject) => {
        app
          .use(staticFiles)
          .listen(port, host, (err?: Error) => {
            if (err != null) {
              reject(err)
              return
            }

            if (app.server == null) {
              throw new Error('App server was null or undefined')
            }

            const address = app.server.address()
            let port = 0

            if (address != null && typeof address !== 'string') {
              port = address.port
            }

            const url = `http://${host}:${port}`

            const server = stoppable(app.server)
            servers.push({
              server,
              url,
              stop: async () => {
                await new Promise<void>((resolve) => {
                  server.stop(() => {
                    resolve()
                  })
                })
              }
            })

            resolve()
          })
      })))
    }

    await Promise.all(promiseServers)

    // Use the server in the tests.
    await use(servers)

    if (!explicitStop) {
      await Promise.all(servers.map(async s => s.stop()))
    }
  }

  return {
    // We pass a tuple to specify fixtures options.
    // In this case, we mark this fixture as worker-scoped.
    servers: [servers, { scope: 'worker', auto: true }]
  }
}

export { servers }
