import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Insurance from '../../build/contracts/Insurance.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

require('dotenv').config()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      insurances: [],
      flightId: '',
      loading: true,
      points: 0,
      activeInsurance: false,
      insuranceTypes: 2,
      balance: 0,
      bankAccount: '0xf17f52151ebef6c7334fad080c5704d77216b732',
      bankAccountBalance: 0
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      )
    }

    this.web3 = new Web3(this.web3Provider)

    this.insurance = TruffleContract(Insurance)
    this.insurance.setProvider(this.web3Provider)

    this.buyWithUSD = this.buyWithUSD.bind(this)
    this.buyWithLP = this.buyWithLP.bind(this)
    this.claim = this.claim.bind(this)
    this.cancelInsurance = this.cancelInsurance.bind(this)
    this.donate = this.donate.bind(this)
  }

  componentDidMount() {
    try {
      this.web3.eth.getCoinbase((err, account) => {
        this.setState({ account })
        this.insurance.deployed().then(insurance => {
          this.insurance = insurance
          for (var i = 1; i <= this.state.insuranceTypes; i++) {
            this.insurance.types(i).then(insurance => {
              const array = [...this.state.insurances]
              array.push({
                insuranceId: insurance[0],
                name: insurance[1],
                awardLP: insurance[2],
                costUSD: insurance[3],
                costLP: insurance[4],
                info: insurance[5],
                active: insurance[6]
              })
              this.setState({ insurances: array })
            })
          }

          this.insurance.profile(this.state.account).then(profile => {
            this.setState({
              points: profile[0].toNumber(),
              balance: profile[1].toNumber(),
              activeInsurance: profile[2],
              flightId: profile[3],
              insuranceType: profile[4]
            })
          })
          this.insurance.profile(this.state.bankAccount).then(profile => {
            this.setState({
              bankAccountBalance: profile[1].toNumber()
            })
          })
          this.setState({ loading: false })
        })
      })
    } catch (error) {
      console.log(error)
    }

    axios
      .get(`https://api.coinmarketcap.com/v1/ticker/ethereum/`)
      .then(res => {
        this.setState({ transactionRate: res.data[0].price_usd })
      })
      .catch(error => {
        console.log(error)
      })
  }
  refreshAccountInfo(profile) {
    this.setState({
      points: profile[0].toNumber(),
      balance: profile[1].toNumber(),
      activeInsurance: profile[2],
      flightId: profile[3],
      insuranceType: profile[4]
    })
  }

  buyWithUSD(insuranceId, awardLP, costUSD, flightId) {
    this.insurance
      .buyWithUSD(insuranceId, this.state.bankAccount, awardLP, flightId, {
        from: this.state.account,
        value: this.web3.toWei(costUSD / this.state.transactionRate, 'ether')
      })
      .then(() => {
        this.insurance.profile(this.state.account).then(profile => {
          this.refreshAccountInfo(profile)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  buyWithLP(insuranceId, costLP, flightId) {
    this.insurance
      .buyWithLP(insuranceId, costLP, flightId, { from: this.state.account })
      .then(() => {
        this.insurance.profile(this.state.account).then(profile => {
          this.refreshAccountInfo(profile)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  claim(insuranceId, activeInsurance, delayed, cancelled, flightId) {
    var conversionRate = Math.round(
      this.web3.toWei(1 / this.state.transactionRate, 'ether')
    )
    this.insurance
      .claim(
        insuranceId,
        this.state.bankAccount,
        activeInsurance,
        delayed,
        cancelled,
        flightId,
        Math.round(this.web3.toWei(1 / this.state.transactionRate, 'ether')),
        {
          from: this.state.account
        }
      )
      .then(() => {
        this.insurance.profile(this.state.account).then(profile => {
          this.refreshAccountInfo(profile)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  cancelInsurance() {
    this.insurance
      .cancelInsurance({
        from: this.state.account
      })
      .then(() => {
        this.insurance.profile(this.state.account).then(profile => {
          this.refreshAccountInfo(profile)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  donate() {
    this.insurance
      .donate({
        from: this.state.account,
        value: this.web3.toWei(10, 'ether')
      })
      .then(() => {
        this.insurance.profile(this.state.account).then(profile => {
          this.refreshAccountInfo(profile)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1>Insurance Panel</h1>
          <br />
          {this.state.loading ? (
            <p class="text-center">Loading...</p>
          ) : (
            <Content
              account={this.state.account}
              points={this.state.points}
              insurances={this.state.insurances}
              activeInsurance={this.state.activeInsurance}
              buyWithUSD={this.buyWithUSD}
              buyWithLP={this.buyWithLP}
              balance={this.state.balance}
              flightId={this.state.flightId}
              claim={this.claim}
              insuranceType={this.state.insuranceType}
              cancelInsurance={this.cancelInsurance}
              donate={this.donate}
            />
          )}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
