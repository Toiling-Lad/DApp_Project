import React from 'react'
import Table from './Table'
import Flights from './Flights'

class Content extends React.Component {
  render() {
    return (
      <div>
        <p>Your account: {this.props.account}</p>
        <p>Balance USD: {this.props.balance}</p>
        <p>Loyalty Points (LP): {this.props.points}</p>
        <p>Your Insured Flight: {this.props.flightId}</p>
        {this.props.insurances.length && (
          <Table
            insurances={this.props.insurances}
            activeInsurance={this.props.activeInsurance}
            buyWithUSD={this.props.buyWithUSD}
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
            buyWithUSD={this.props.buyWithUSD}
            buyWithLP={this.props.buyWithLP}
            points={this.props.points}
            claim={this.props.claim}
            insuranceType={this.props.insuranceType}
          />
        )}
      </div>
    )
  }
}

export default Content
