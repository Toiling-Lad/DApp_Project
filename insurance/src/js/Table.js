import React from 'react'

class Table extends React.Component {
  buttonSGD(insuranceId, points, amount) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(),
            this.props.buyWithSGD(
              insuranceId,
              points.toNumber(),
              amount.toNumber()
            )
        }}>
        SGD
      </button>
    )
  }
  buttonLP(insuranceId, costLP) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(),
            this.props.buyWithLP(insuranceId, costLP.toNumber())
        }}>
        LP
      </button>
    )
  }

  render() {
    let rows = []

    this.props.insurances.forEach(element => {
      rows.push(
        <tr>
          <td>{element.name}</td>
          <td>{element.info.toString()}</td>
          <td>{element.active.toString()}</td>
          <td>{element.active.toString()}</td>
          <td>
            {this.buttonSGD(
              element.insuranceId,
              element.awardLP,
              element.costSGD
            )}
          </td>
          <td>{this.buttonLP(element.insuranceId, element.costLP)}</td>
        </tr>
      )
    })

    return (
      <table class="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Cost</th>
            <th>Active</th>
            <th>Flight Delayed</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default Table
