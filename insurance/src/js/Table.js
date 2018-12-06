import React from 'react'

class Table extends React.Component {
  button(id, points, amount) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(), this.props.buy(id, points.toNumber(), amount.toNumber())
        }}>
        Purchase
      </button>
    )
  }

  render() {
    let rows = []

    this.props.insurances.forEach(element => {
      rows.push(
        <tr>
          <td>{element.name}</td>
          <td>{element.cost.toString()}</td>
          <td>{element.active.toString()}</td>
          <td>{element.active.toString()}</td>
          <td>{this.button(element.id, element.points, element.amount)}</td>
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
            <th>Option</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default Table
