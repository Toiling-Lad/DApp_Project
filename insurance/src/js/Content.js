import React from 'react'
import Table from './Table'
import Flights from './Flights'

class Content extends React.Component {
  render() {
    return (
      <div>
        <p>Your account: {this.props.account}</p>
        <p>Balance SGD: {this.props.balance}</p>
        <p>Loyalty Points (LP): {this.props.points}</p>
        <p>Your Insured Flight: {this.props.flightId}</p>
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
        {this.props.insurances.length == 2 && (
          <Flights
            flightId={this.props.flightId}
            insurances={this.props.insurances}
            activeInsurance={this.props.activeInsurance}
            buyWithSGD={this.props.buyWithSGD}
            buyWithLP={this.props.buyWithLP}
            points={this.props.points}
            claim={this.props.claim}
          />
        )}
      </div>
    )
  }
}

export default Content
