## DApp_Project

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Table of Contents

* [ Motivation](#motivation)
* [ Dependencies ](#dependencies)
* [ Getting Started ](#getting-started)
* [ License ](#license)

## Motivation
Flight delay/cancellation insurance Dapp

Develop a Dapp that manages insurance for travelers. Through a web front-end, a traveler should be able to:

- Buy insurance submitting legitimate ticket evidence. Static prices are SGD$30 or 150 loyalty points when round-trip tickets, SGD$20 or 100 points when one-way ticket.
- Payment could be made by integration in-time with Metamask or Mist Ethereum wallet using tokens.
- Loyalty program. Every time a traveler buys insurance, he/she gets points: 30 points for a round trip ticket insurance, and 10 points otherwise.
- Claim money back under following rules. Only the traveler triggers this action.
  - If flight only delayed, the traveler gets SGD$200
  - If flights canceled, the traveler receives SDG$5,000
  - If a traveler got money when the flight was delayed but it turns out to be canceled, he/she can get the remainder SGD$4,800.

The Dapp should perform the following tasks automatically.

- Get the correct rate or conversion SGD/ETH for calculating the correct value to pay in Ethers at the transaction moment.
- Read, analyzed, and extract tickets data. Consider reading PDF or images with QR codes
- Request information about flights existence and status to a legitimate data source (e.g., Changi Airport) through a contract to contract communication.


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