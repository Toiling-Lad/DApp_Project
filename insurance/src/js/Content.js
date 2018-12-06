import React from 'react'
import Table from './Table'

class Content extends React.Component {
  render() {
    return (
      <div>
        <p>Your account: {this.props.account}</p>
        <p>Balance: {this.props.balance}</p>
        <p>Accumulated Loyalty Points (LP): {this.props.points}</p>
        <p>Ethereum conversion rate :</p>
        {this.props.insurances.length && (
          <Table
            insurances={this.props.insurances}
            buy={this.props.buy}
            claim={this.props.claim}
          />
        )}
      </div>
    )
  }
}

export default Content
