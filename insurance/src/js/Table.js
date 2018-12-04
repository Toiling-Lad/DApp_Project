import React from 'react'

class Table extends React.Component {

  render() {
    let rows = []

    this.props.insurances.forEach(element => {
      rows.push(
        <tr>
          <td>{element.name}</td>
          <td>{element.cost.toString()}</td>
          <td>{element.active.toString()}</td>
          <td>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={click => {
                click.preventDefault(), this.props.buy(element.id)
              }}>
              Purchase
            </button>
          </td>
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
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default Table
