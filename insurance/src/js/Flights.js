import React from 'react'
import axios from 'axios'

class Flights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flights: [],
      displayedFlights: []
    }

    this.buttonArea = this.buttonArea.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // http://www.virtualradarserver.co.uk/Documentation/Formats/AircraftList.aspx
    // Find Values from here

    axios
      .get(`api/VirtualRadar/AircraftList.json`)
      .then(res => {
        const data = res.data.acList
          .filter(el => {
            return el.Icao && el.Op && el.From && el.To && el.Alt
          })
          .slice(1, 50)
        this.setState({ flights: data, displayedFlights: data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange(event) {
    let search = event.target.value.toLowerCase(),
      displayedFlights = this.state.flights.filter(el => {
        let searchValue = el.Icao.toLowerCase()
        return searchValue.indexOf(search) !== -1
      })
    this.setState({
      displayedFlights: displayedFlights
    })
  }

  buttonSGD(insuranceId, points, amount, flightId) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(),
            this.props.buyWithSGD(
              insuranceId,
              points.toNumber(),
              amount.toNumber(),
              flightId
            )
        }}>
        SGD
      </button>
    )
  }

  buttonLP(insuranceId, costLP, flightId) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(),
            this.props.buyWithLP(insuranceId, costLP.toNumber(), flightId)
        }}>
        LP
      </button>
    )
  }

  buttonClaim(insuranceId, activeInsurance, delayed, cancelled, flightId) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(),
            this.props.claim(
              insuranceId,
              activeInsurance,
              delayed,
              cancelled,
              flightId
            )
        }}>
        claim
      </button>
    )
  }

  buttonArea(element, flightId, column) {
    if (this.props.activeInsurance && this.props.flightId == flightId) {
      console.log(this.props)
    }
    return (
      <td>
        {!this.props.activeInsurance
          ? this.buttonSGD(
              element.insuranceId,
              element.awardLP,
              element.costSGD,
              flightId
            )
          : null}
        {this.props.points >= element.costLP
          ? this.buttonLP(element.insuranceId, element.costLP, flightId)
          : null}
        {this.props.activeInsurance &&
        this.props.flightId == flightId &&
        column == 1 &&
        this.props.insuranceType == 'One-Way'
          ? this.buttonClaim(
              element.insuranceId,
              this.props.activeInsurance,
              true,
              false,
              flightId
            )
          : null}
        {this.props.activeInsurance &&
        this.props.flightId == flightId &&
        column == 2 &&
        this.props.insuranceType == 'Round-Trip'
          ? this.buttonClaim(
              element.insuranceId,
              this.props.activeInsurance,
              true,
              false,
              flightId
            )
          : null}
      </td>
    )
  }

  render() {
    let rows = []
    this.state.displayedFlights.forEach(flight => {
      rows.push(
        <tr>
          <td>{flight.Icao}</td>
          <td>{flight.Op}</td>
          <td>{flight.From}</td>
          <td>{flight.To}</td>
          <td>{flight.Alt}</td>
          <td>{flight.Sat}</td>
          <td>{flight.Interested}</td>
          {this.buttonArea(this.props.insurances[0], flight.Icao, 1)}
          {this.buttonArea(this.props.insurances[1], flight.Icao, 2)}
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
              <th>Flight</th>
              <th>Company</th>
              <th>From</th>
              <th>To</th>
              <th>Altitude (Ft)</th>
              <th>Delayed</th>
              <th>Cancelled</th>
              <th>One-Way</th>
              <th>Round-Trip</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  }
}

export default Flights
