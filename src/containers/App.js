import React, { Component } from 'react';
import '../App.css';
import store from '../store';
import ApiAdapter from '../adapter';
import { connect } from 'react-redux';
import { LOAD_API_DATA } from '../actions';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EditProfile from '../components/EditProfile';
import Reservations from '../components/Reservations';
import AdminPanel from '../components/AdminPanel';
import CreateTour from '../components/CreateTour';
import MakeReservation from '../components/MakeReservation';
import { Header } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props)
    this.ApiAdapter = new ApiAdapter()
    this.state = {
      usernameInput: '',
      passwordInput: '',
      zipcodeInput: '',
      bioInput: '',
      adminInput: false,
      errors: null,
      successResponse: null,
      selectedTourId: null,
      selectedReservationId: null,
      loggedInUser: null
    }
  }

  componentDidMount() {
    this.ApiAdapter.getApiData().then(initialAppState=>{
      const payload = {
        users: initialAppState[0],
        tours: initialAppState[1],
        reservations: initialAppState[2]
      }
      store.dispatch({
        type: LOAD_API_DATA,
        payload
      })
    })
  }

  handleUsernameInput = e => this.setState({usernameInput:e.target.value})
  handlePasswordInput = e => this.setState({passwordInput:e.target.value})
  handleZipcodeInput = e => this.setState({zipcodeInput:e.target.value})
  handleBioInput = e => this.setState({bioInput:e.target.value})
  handlReservationSelect = (e) => this.setState({selectedReservationId: parseInt(e.target.name)})
  handleAdminChange = (e) => this.setState({adminInput: !this.state.adminInput})
  handleTourSelect = (e) => this.setState({selectedTourId: parseInt(e.target.name)})

  handleLoginSubmit = (e) => {
    e.preventDefault()
    const foundUser = this.props.users.find((user) => {
      return this.state.usernameInput === user.username && this.state.passwordInput === user.password
    })
    if (foundUser) {
      this.setState({
        loggedInUser: foundUser,
        usernameInput: '',
        passwordInput: ''
      })
      this.props.history.push('/reservations')
    }
  }

  handleLogout = (e) => this.setState({loggedInUser: null})

  handleSignupSubmit = (e) => {
    const userObj = {
      username: this.state.usernameInput,
      password: this.state.passwordInput,
      zip_postcode: this.state.zipcodeInput,
      bio: this.state.bioInput,
      administrator: this.state.adminInput
    }

    this.ApiAdapter.postUser(userObj).then(r=>{
      if (r.errors) {
        this.setState({errors: r.errors})
      } else {
        this.setState({
          usernameInput: '',
          passwordInput: '',
          zipcodeInput: '',
          bioInput: '',
          adminInput: false,
          errors: null,
          loggedInUser: null
        })
      }
    })
  }

  handleSubmitReservation = (e) => {
    const reservationObj = {
      user_id: this.state.loggedInUser.id,
      tour_id: this.state.selectedTourId
    }

    this.ApiAdapter.postReservation(reservationObj).then(r=>{
      if (r.errors) {
        this.setState({errors: r.errors})
      } else {
        this.setState({
          selectedTourId: null,
          successResponse: r
        })
      }
    })
  }

  handleCancelReservation = (e) => {
    const reservationObj = {
      id: this.state.selectedReservationId
    }
    this.ApiAdapter.deleteReservation(reservationObj).then(r=>{
      if (r.errors) {
        this.setState({errors: r.errors})
      } else {
        this.setState({
          selectedReservationId: null,
          successResponse: r
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header size='huge'>WOLM</Header>
        <Header size='medium'>Website of Lower Manhattan</Header>
        <div className="body">
          <NavBar loggedInUser={this.state.loggedInUser}
                  handleLogout={this.handleLogout}
                  />
          <Route  exact path="/signup"
                  render={ (renderProps) => {
                    return (
                      <Signup
                        usernameInput={this.state.usernameInput}
                        passwordInput={this.state.passwordInput}
                        zipcodeInput={this.state.zipcodeInput}
                        bioInput={this.state.bioInput}
                        adminInput={this.state.adminInput}
                        handleUsernameInput={this.handleUsernameInput}
                        handlePasswordInput={this.handlePasswordInput}
                        handleZipcodeInput={this.handleZipcodeInput}
                        handleBioInput={this.handleBioInput}
                        handleSignupSubmit={this.handleSignupSubmit}
                        handleAdminChange={this.handleAdminChange}
                        errors={this.state.errors}
                        />
              )
            }}
            />
          <Route  exact path="/login"
            render={ (renderProps) => {
              return (
                <Login
                  usernameInput={this.state.usernameInput}
                  passwordInput={this.state.passwordInput}
                  handleUsernameInput={this.handleUsernameInput}
                  handlePasswordInput={this.handlePasswordInput}
                  handleLoginSubmit={this.handleLoginSubmit}
                  />
              )
            }}
            />
          <Route  exact path="/edit-profile"
                  render={ (renderProps) => {
                    return (
                      <React.Fragment>
                        { this.state.loggedInUser && <EditProfile loggedInUser={this.state.loggedInUser}/>}
                      </React.Fragment>
                    )
                  }}
            />
          <Route  exact path="/reservations"
                  render={ (renderProps) => {
                    return (
                      <React.Fragment>
                        <Reservations loggedInUser={this.state.loggedInUser}
                                      successResponse={this.state.successResponse}
                                      handlReservationSelect={this.handlReservationSelect}
                                      handleCancelReservation={this.handleCancelReservation}
                                      />
                        <MakeReservation  loggedInUser={this.state.loggedInUser}
                                          successResponse={this.state.successResponse}
                                          handleTourSelect={this.handleTourSelect}
                                          handleSubmitReservation={this.handleSubmitReservation}
                                          />
                      </React.Fragment>
                    )
                  }}
            />
          <Route  exact path="/admin"
                  render={ (renderProps) => {
                    return (
                      <AdminPanel />
                    )
                  }}
            />
          <Route  exact path="/new-tour"
                    render={ (renderProps) => {
                      return (
                        <CreateTour />
                      )
                    }}
              />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    tours: state.tours,
    reservations: state.reservations
  }
}

export default withRouter(connect(mapStateToProps)(App));
