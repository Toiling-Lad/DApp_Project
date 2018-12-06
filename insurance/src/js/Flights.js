import React from 'react'

class Flights extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayedFlights: this.props.flights
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let search = event.target.value.toLowerCase(),
      displayedFlights = this.props.flights.filter((el) => {
        let searchValue = el.name.toLowerCase();
        return searchValue.indexOf(search) !== -1;
      })
    this.setState({
      displayedFlights: displayedFlights
    })
  }


  render() {

    let rows = []
    this.state.displayedFlights.forEach(element => {
      rows.push(
        <tr>
          <td>{element.name}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
      )
    })

    return (
      <div className="holder">
        <div>
          Search for your flight: 
          <input type="text" classNAme="search" onChange={this.handleChange} /> 
        </div>
         <table class="table">
          <thead>
            <tr>
              <th>Flights</th>
              <th>Delayed</th>
              <th>Cancelled</th>
              <th>Insurance</th>
            </tr>
            </thead>
          <tbody>{rows}</tbody>
        </table> 
      </div>)
  }
}

export default Flights
