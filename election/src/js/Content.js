import React from 'react'
import Table from './Table'

class Content extends React.Component {
  render() {
    return (
      <div>
        <Table candidates={this.props.candidates} />
        <hr />
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content
