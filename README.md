## DApp_Project

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Table of Contents

* [ Motivation](#motivation)
* [ Dependencies ](#dependencies)
* [ Getting Started ](#getting-started)
* [ License ](#license)

## Motivation
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

## Dependencies
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/

## Getting Started

#### `$ git clone https://github.com/Toiling-Lad/DApp_Project.git`

Get the project on your computer and go inside the project directory.

```
$ cd election
$ npm install
```


#### `$ npm run start`
Runs your app in development mode with prettier and tests in order to assure code quality.


#### Running metamask
TODO: What to do to get running

#### `$ npm run prettier`
[Prettier](https://github.com/prettier/prettier) is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
Rules can be found in `pakage.json`

#### `$ truffle test`
To run test bundled Mocha and Chai tests.

#### `$ truffle migrate --reset`
Smart contract needs to be migrated each time ganache is restarted.

## License

[MIT License](LICENSE)