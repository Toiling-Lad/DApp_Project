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
      buying: false,
      totalPoints: '',
      insuranceTypes: 2
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
                cost: insurance[4]
              })
              this.setState({ insurances: array })
            })
          }
          this.insurance.totalPoints().then(totalPoints => {
            this.setState({ totalPoints: totalPoints.toString() })
          })
          this.insurance.passengers(this.state.account).then(bought => {
            this.setState({ bought, loading: false })
          })
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState
  }

  watchEvents() {
    this.insurance
      .boughtInsurance(
        {},
        {
          fromBlock: 0,
          toBlock: 'latest'
        }
      )
      .watch((error, event) => {
        this.setState({ buying: false })
      })
  }

  buy(insuranceId) {
    this.setState({ buying: true })
    this.insurance
      .buy(insuranceId, { from: this.state.account })
      .then(result => this.setState({ bought: true }))
  }

  render() {
    let content = this.state.loading ? (
      <p class="text-center">Loading...</p>
    ) : (
      <Content
        account={this.state.account}
        totalPoints={this.state.totalPoints}
        insurances={this.state.insurances}
        buy={this.buy}
      />
    )

    return (
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1>Insurance Panel</h1>
          <br />
          {content}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
