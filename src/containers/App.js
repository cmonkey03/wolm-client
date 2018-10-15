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
import AdminPanel from '../components/AdminPanel';
import CreateTour from '../components/CreateTour';

class App extends Component {
  constructor(props) {
    super(props)
    this.ApiAdapter = new ApiAdapter()
    this.state = {
      usernameInput: '',
      passwordInput: '',
      zipcodeInput: '',
      bioInput: '',
      errors: null,
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

  handleLoginSubmit = (e) => {
    e.preventDefault()
    const foundUser = this.props.users.find((user) => {
      return this.state.usernameInput === user.username && this.state.passwordInput === user.password
    })
    this.setState({
      loggedInUser: foundUser,
      usernameInput: '',
      passwordInput: ''
    })
  }

  handleSignupSubmit = (e) => {
    const userObj = {
      username: this.state.usernameInput,
      password: this.state.passwordInput,
      zip_postcode: this.state.zipcodeInput,
      bio: this.state.bioInput
    }

    this.ApiAdapter.postUser(userObj).then(r=>{
      if (r.errors) {
        this.setState({errors: r.errors}, () => console.log(this.state))
      } else {
        this.setState({
          usernameInput: '',
          passwordInput: '',
          zipcodeInput: '',
          bioInput: '',
          errors: null,
          loggedInUser: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to WOLM</h1>
        {this.state.loggedInUser ? `Logout ${this.state.loggedInUser.username}` : "Log in"}
        <React.Fragment>
          <NavBar/>
          <Route
            exact
            path="/login"
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
            <Route
              exact
              path="/signup"
              render={ (renderProps) => {
                return (
                  <Signup
                    usernameInput={this.state.usernameInput}
                    passwordInput={this.state.passwordInput}
                    zipcodeInput={this.state.zipcodeInput}
                    bioInput={this.state.bioInput}
                    handleUsernameInput={this.handleUsernameInput}
                    handlePasswordInput={this.handlePasswordInput}
                    handleZipcodeInput={this.handleZipcodeInput}
                    handleBioInput={this.handleBioInput}
                    handleSignupSubmit={this.handleSignupSubmit}
                    errors={this.state.errors}
                    />
                )
              }}
              />
            <Route
              exact
              path="/edit-profile"
              render={ (renderProps) => {
                return (
                  <EditProfile />
                )
              }}
              />
            <Route
              exact
              path="/reservations"
              render={ (renderProps) => {
                return (
                  <h1>Reservations</h1>
                )
              }}
              />
            <Route
              exact
              path="/admin"
              render={ (renderProps) => {
                return (
                  <AdminPanel />
                )
              }}
              />
            <Route
              exact
              path="/new-tour"
              render={ (renderProps) => {
                return (
                  <CreateTour />
                )
              }}
              />
          </React.Fragment>
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
