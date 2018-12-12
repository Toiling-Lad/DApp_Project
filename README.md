## DApp_Project

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Table of Contents

* [ Motivation](#motivation)
* [ Dependencies ](#dependencies)
* [ Getting Started ](#getting-started)
* [ License ](#license)

## Motivation
Flight delay/cancellation insurance Dapp

Dapp manages insurance for travelers. Through a web front-end, traveler is able to:

- Buy insurance submitting legitimate ticket evidence. Static prices are $30 or 150 loyalty points when round-trip tickets, $20 or 100 points when one-way ticket.
- Payment can be made by Metamask.
- Loyalty program. Every time a traveler buys insurance, he/she gets points: 30 points for a round trip ticket insurance, and 10 points otherwise.
- Claim money back under following rules. Only the traveler triggers this action.
  - If flight only delayed, the traveler gets $200
  - If flights canceled, the traveler receives $5,000
  - If a traveler got money when the flight was delayed but it turns out to be canceled, he/she can get the remainder SGD$4,800.

The Dapp performs the following tasks automatically.

- Correct rate or conversion $/ETH for calculating the correct value to pay in Ethers at the transaction moment.
- Request information about flights existence and status to a legitimate data source


## Dependencies
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/
- Aviation Edge API: https://aviation-edge.com/

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
get chrome extension


#### Aviation Edge API
 
 ```
 Go to -> '.DApp_Project/insurance/src/js/Flights.js' and place your Aviation Edge api-key.

 const api_key = 'PLACE_YOUR_API_KEY_HERE'
 ```

#### `$ npm run prettier`
[Prettier](https://github.com/prettier/prettier) is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
Rules can be found in `pakage.json`

#### `$ truffle test`
To run test bundled Mocha and Chai tests.

#### `$ truffle migrate --reset`
Smart contract needs to be migrated each time ganache is restarted.

## License

[MIT License](LICENSE)
