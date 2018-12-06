import React from 'react'
import Table from './Table'

class Content extends React.Component {
  buttonClaim(activeInsurance, delayed, cancelled) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(),
            this.props.claim(activeInsurance, delayed, cancelled)
        }}>
        claim
      </button>
    )
  }

  render() {
    return (
      <div>
        <p>Your account: {this.props.account}</p>
        <p>Balance: {this.props.balance}</p>
        <p>Accumulated Loyalty Points (LP): {this.props.points}</p>
        <p>bank Account Balance: {this.props.bankAccountBalance}</p>
        {this.props.insurances.length && (
          <Table
            insurances={this.props.insurances}
            buyWithSGD={this.props.buyWithSGD}
            buyWithLP={this.props.buyWithLP}
            claim={this.props.claim}
          />
        )}
        <td>{this.buttonClaim(this.props.activeInsurance, true, false)}</td>
      </div>
    )
  }
}

export default Content
