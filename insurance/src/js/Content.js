import React from 'react'
import Table from './Table'
import Flights from './Flights'

class Content extends React.Component {
  render() {
    return (
      <div>
        <p>Your account: {this.props.account}</p>
        <p>Balance: {this.props.balance}</p>
        <p>Accumulated Loyalty Points (LP): {this.props.points}</p>
        {this.props.insurances.length && (
          <Table
            insurances={this.props.insurances}
            activeInsurance={this.props.activeInsurance}
            buyWithSGD={this.props.buyWithSGD}
            buyWithLP={this.props.buyWithLP}
            points={this.props.points}
            claim={this.props.claim}
          />
        )}
        {this.props.flights.length && <Flights flights={this.props.flights} />}
      </div>
    )
  }
}

export default Content
