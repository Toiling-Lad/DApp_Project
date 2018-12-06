import React from 'react'

class Table extends React.Component {

  render() {
    let rows = []

    this.props.insurances.forEach(element => {
      rows.push(
        <tr>
          <td>{element.name}</td>
          <td>{element.info.toString()}</td>
          <td>{element.active.toString()}</td>
          <td>{element.active.toString()}</td>
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
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default Table
