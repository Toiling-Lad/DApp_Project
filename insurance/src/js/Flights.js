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
    const api_key = 'c4ad02-f46eb3'

    axios
      .get(
        `http://aviation-edge.com/v2/public/timetable?key=` +
          api_key +
          `&iataCode=JFK&type=departure`
      )
      .then(res => {
        const data = res.data
        this.setState({ flights: data, displayedFlights: data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange(event) {
    let search = event.target.value.toLowerCase(),
      displayedFlights = this.state.flights.filter(el => {
        let searchValue = el.flight.iataNumber.toLowerCase()
        return searchValue.indexOf(search) !== -1
      })
    this.setState({
      displayedFlights: displayedFlights
    })
  }

  buttonUSD(insuranceId, points, amount, flightId) {
    return (
      <button
        type="submit"
        class="btn btn-primary"
        onClick={click => {
          click.preventDefault(),
            this.props.buyWithUSD(
              insuranceId,
              points.toNumber(),
              amount.toNumber(),
              flightId
            )
        }}>
        USD
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

  buttonArea(element, flightId, status, column) {
    let delayed = [status].includes('incident' || 'diverted' || 'unknown')
    let cancelled = status === 'cancelled'
    return (
      <td>
        {!this.props.activeInsurance
          ? this.buttonUSD(
              element.insuranceId,
              element.awardLP,
              element.costUSD,
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
              delayed,
              cancelled,
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
              delayed,
              cancelled,
              flightId
            )
          : null}
      </td>
    )
  }

  render() {
    let rows = []
    this.state.displayedFlights.forEach(element => {
      rows.push(
        <tr>
          <td>{element.flight.iataNumber}</td>
          <td>{element.airline.name}</td>
          <td>{element.departure.iataCode}</td>
          <td>{element.arrival.iataCode}</td>
          <td>{element.status}</td>
          {this.buttonArea(
            this.props.insurances[0],
            element.flight.iataNumber,
            element.status,
            1
          )}
          {this.buttonArea(
            this.props.insurances[1],
            element.flight.iataNumber,
            element.status,
            2
          )}
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
              <th>Departure</th>
              <th>Arrival</th>
              <th>Status</th>
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
