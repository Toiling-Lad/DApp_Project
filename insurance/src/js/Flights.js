import React from 'react'

class Table extends React.Component {
  render() {
    let rows = []

    this.props.flights.forEach(element => {
      rows.push(
        <tr>
          <td>{element.name}</td>
        </tr>
      )
    })

    return (
      <table class="table">
        <thead>
          <tr>
            <th>Flights</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default Table
