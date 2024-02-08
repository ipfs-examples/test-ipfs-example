# test-ipfs-example <!-- omit in toc -->

[![codecov](https://img.shields.io/codecov/c/github/ipfs-examples/test-ipfs-example.svg?style=flat-square)](https://codecov.io/gh/ipfs-examples/test-ipfs-example)
[![CI](https://img.shields.io/github/actions/workflow/status/ipfs-examples/test-ipfs-example/js-test-and-release.yml?branch=main\&style=flat-square)](https://github.com/ipfs-examples/test-ipfs-example/actions/workflows/js-test-and-release.yml?query=branch%3Amain)

> A test suite for testing examples using playwright for browsers and simple output matching for node

# Install

```console
$ npm i test-ipfs-example
```

## Browser `<script>` tag

Loading this module through a script tag will make it's exports available as `TestIpfsExample` in the global namespace.

```html
<script src="https://unpkg.com/test-ipfs-example/dist/index.min.js"></script>
```

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Node.js tests](#nodejs-tests)
  - [Browser tests](#browser-tests)
- [API Docs](#api-docs)
- [License](#license)
- [Contribution](#contribution)

## Usage

### Node.js tests

To run node js tests, create a test file similar to:

```js
import { waitForOutput } from 'test-ipfs-example/node'

await waitForOutput('the output to expect', 'path/to/example.js')
```

Run it from your package.json

```json
{
  "scripts": {
    "test": "test-node-example ./my-test.spec.js"
  }
}
```

### Browser tests

To run browser tests, create a test file similar to:

```js
import { setup, expect } from 'test-ipfs-example/browser'

const test = setup({
  // optionally configure server(s) - if omitted one will be created listening
  // on a random high port that serves the contents of the `dist` folder in
  // the root of the example
  servers: [{
    port: 0,
    host: '127.0.0.1',
    path: 'dist'
  }]
})

test.describe('test a browser app', () => {
  test.beforeEach(async ({ servers, page }) => {
    await page.goto(servers[0].url)
  })

  test('should have browser success', async ({ page }) => {
    // make some playwright assertions here
    await page.waitForSelector('#app')
    const connections = await page.textContent('#app')
    expect(connections).toContain('hello world')
  })
})
```

Run it from your package.json

```json
{
  "scripts": {
    "test": "test-browser-example ./my-test.spec.js"
  }
}
```

# API Docs

- <https://ipfs-examples.github.io/test-ipfs-example>

# License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

# Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
