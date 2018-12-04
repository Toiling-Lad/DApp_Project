import React from 'react'
import Table from './Table'

class Content extends React.Component {
  render() {
    return (
      <div>
        <p>Your account: {this.props.account}</p>
        <p>Accumulated Loyalty Points (LP): {this.props.totalPoints}</p>
        <p>Ethereum conversion rate :</p>
        {this.props.insurances.length && (
          <Table insurances={this.props.insurances} buy={this.props.buy} />
        )}
      </div>
    )
  }
}

export default Content
