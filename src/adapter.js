const BASE_URL = 'http://localhost:3000/api/v1'

const Users = 'users'
const Tours = 'tours'
const Reservations = 'reservations'

export default class Adapter {
  parseHeaders = response => response.json()

  fetchEndpoint = (endPoint) => fetch(`${BASE_URL}/${endPoint}`).then(this.parseHeaders)

  getUsers = () => this.fetchEndpoint(Users)

  getTours = () => this.fetchEndpoint(Tours)

  getReservations = () => this.fetchEndpoint(Reservations)

  getApiData = () => (Promise.all([
    this.getUsers(),
    this.getTours(),
    this.getReservations()
  ]))

  postUser = (userObj) => (fetch(`${BASE_URL}/${Users}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userObj)
    })
    .then(this.parseHeaders)
  )

  updateUser = (userObj) => (fetch(`${BASE_URL}/${Users}/${userObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userObj)
    })
    .then(this.parseHeaders)
  )

  postTour = (tourObj) => (fetch(`${BASE_URL}/${Tours}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(tourObj)
    })
    .then(this.parseHeaders)
  )

  postReservation = (reservationObj) => (fetch(`${BASE_URL}/${Reservations}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(reservationObj)
    })
    .then(this.parseHeaders)
  )

}
