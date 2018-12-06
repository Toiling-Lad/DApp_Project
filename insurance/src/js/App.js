import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Insurance from '../../build/contracts/Insurance.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      insurances: [],
      bought: false,
      loading: true,
      points: 0,
      insuranceTypes: 2,
      balance: 0,
      bankAccount: "0xf17f52151ebef6c7334fad080c5704d77216b732"
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

    this.buy = this.buy.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    try {
      this.web3.eth.getCoinbase((err, account) => {
        this.setState({ account })
        this.insurance.deployed().then(insurance => {
          this.insurance = insurance
          this.watchEvents()
          for (var i = 1; i <= this.state.insuranceTypes; i++) {
            this.insurance.types(i).then(insurance => {
              const array = [...this.state.insurances]
              array.push({
                id: insurance[0],
                name: insurance[1],
                active: insurance[2],
                points: insurance[3],
                cost: insurance[4],
                amount: insurance[5]
              })
              this.setState({ insurances: array })
            })
          }

          this.insurance.profile(this.state.account).then(profile => {
            this.setState({
              points: profile[0].toNumber(),
              balance: profile[1].toNumber()
            })
          })
          this.setState({ loading: false })
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  watchEvents() {
    this.insurance
      .Transfer(
        {},
        {
          fromBlock: 0,
          toBlock: 'latest'
        }
      )
      .watch((error, event) => {
        console.log(error)
      })
  }

  buy(insuranceId, points, amount) {
    this.insurance.buy(
        insuranceId, 
        this.state.bankAccount, 
        points,
        amount, 
        {from: this.state.account}
      )
      .then(() => {
        alert('Transaction successful!')
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
              bankAccount={this.state.bankAccount}
              points={this.state.points}
              insurances={this.state.insurances}
              buy={this.buy}
              balance={this.state.balance}
              claim={this.claim}
            />
          )}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
