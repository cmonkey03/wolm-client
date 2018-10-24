const BASE_URL = 'http://localhost:3000/api/v1'

const Users = 'users'
const Tours = 'tours'
const Reservations = 'reservations'
const Login = 'login'
const Profile = 'profile'

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

  loginUser = (username, password) => (
    fetch(`${BASE_URL}/${Login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
  )

  fetchCurrentUser = () => (
    fetch(`${BASE_URL}/${Profile}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this.parseHeaders)
  )

  createUser = (userObj) => (fetch(`${BASE_URL}/${Users}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userObj)
    })
  )

  updateUser = (userObj) => (fetch(`${BASE_URL}/${Users}/${userObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(userObj)
    })
  )

  createTour = (tourObj) => (fetch(`${BASE_URL}/${Tours}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(tourObj)
    })
  )

  createReservation = (reservationObj) => (fetch(`${BASE_URL}/${Reservations}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(reservationObj)
    })
  )

  cancelReservation = (reservationObj) => (fetch(`${BASE_URL}/${Reservations}/${reservationObj.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
  )

}
