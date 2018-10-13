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

  postUser = (endPoint, userObj) => this.fetch(`${BASE_URL}/${endPoint}`, {
    method: 'post',
    headers: {
      Content: 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(userObj)
  })
  .then(this.parseHeaders)

}
