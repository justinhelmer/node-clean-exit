# node-clean-exit
A small module for exiting a node process cleanly, with ease.

[![npm package](https://badge.fury.io/js/node-clean-exit.svg)](https://www.npmjs.com/package/node-clean-exit)
[![node version](https://img.shields.io/node/v/node-clean-exit.svg?style=flat)](http://nodejs.org/download/)
[![dependency status](https://david-dm.org/justinhelmer/node-clean-exit.svg)](https://github.com/justinhelmer/node-clean-exit)
[![devDependency status](https://david-dm.org/justinhelmer/node-clean-exit/dev-status.svg)](https://github.com/justinhelmer/node-clean-exit#info=devDependencies)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/justinhelmer/node-clean-exit/issues)

Clean exits. period. Say goodbye to the days of:

```bash
phantom_process.js       1469 justin   54r     REG                1,2       170 3850404 /Users/justin/.node/bin
phantom_process.js       1788 justin   55r     REG                1,2      1836 6122132 /Users/justin/.node/bin
phantom_process.js      13447 justin   57r     REG                1,2       238 6122133 /Users/justin/.node/bin
phantom_process.js      19130 justin   59r     REG                1,2       442 6122134 /Users/justin/.node/bin
phantom_process.js      22401 justin  345u     REG                1,2      3072 4269314 /Users/justin/.node/bin
```

Intended only for very basic use cases; the goal is to keep it simple.

## Usage

At the **bottom** of your node script, add:

```js
require('node-clean-exit')();
```

That's it! Your script now captures `SIGINT` and `UncaughtException` errors, outputs the stack trace, and exits cleanly.

## Options

Options can be passed as well, using:

```js
require('node-clean-exit')(options);
```

- `quiet` _{boolean}_ - Suppress all output. Defaults to `false`.
- `verbose` _{mixed}_ - Can be a boolean or a number. The higher the number, the higher the verbosity. Defaults to `false`.
- `children` - An array of `node` [child processes](https://nodejs.org/api/child_process.html) to be killed on exit.

## Contributing

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/justinhelmer/node-clean-exit/issues)
[![devDependency status](https://david-dm.org/justinhelmer/node-clean-exit/dev-status.svg)](https://github.com/justinhelmer/node-clean-exit#info=devDependencies)

## Licence

The MIT License (MIT)

Copyright (c) 2016 Justin Helmer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
