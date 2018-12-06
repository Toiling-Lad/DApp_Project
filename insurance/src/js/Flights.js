import React from 'react'

class Flights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayedFlights: this.props.flights,
    }

    this.buttonArea = this.buttonArea.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let search = event.target.value.toLowerCase(),
      displayedFlights = this.props.flights.filter(el => {
        let searchValue = el.name.toLowerCase()
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

  buttonArea(element, flightId) {
    return (
      <td>
        {!this.props.activeInsurance ? this.buttonSGD(
          element.insuranceId,
          element.awardLP,
          element.costSGD,
          flightId
        ) : null}
        {this.props.points >= element.costLP ? this.buttonLP(element.insuranceId, element.costLP, flightId) : null}
        {element.active && (this.props.flightId == flightId) ? this.buttonClaim(
          element.insuranceId,
          element.active,
          true,
          false,
          flightId
        ): null}
      </td>
    )
  }

  render() {
    let rows = []
    this.state.displayedFlights.forEach(flight => {
      rows.push(
        <tr>
          <td>{flight.name}</td>
          <td>N/A</td>
          <td>N/A</td>
          {this.buttonArea(this.props.insurances[0], flight.name)}
          {this.buttonArea(this.props.insurances[1], flight.name)}
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
