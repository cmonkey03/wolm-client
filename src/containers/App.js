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

class App extends Component {

  constructor(props) {
    super(props)
    this.ApiAdapter = new ApiAdapter()
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

  render() {
    return (
      <div className="App">
        <h1>Welcome to WOLM</h1>
        <React.Fragment>
          <NavBar/>
          <Route
            exact
            path="/login"
            render={ (renderProps) => {
              return (
                <Login />
              )
            }}
            />
            <Route
              exact
              path="/signup"
              render={ (renderProps) => {
                return (
                  <Signup />
                )
              }}
              />
            <Route
              exact
              path="/edit-profile"
              render={ (renderProps) => {
                return (
                  <h1>Edit your profile</h1>
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
                  <h1>Administrator Panel</h1>
                )
              }}
              />
            <Route
              exact
              path="/new-tour"
              render={ (renderProps) => {
                return (
                  <h1>Create a Tour</h1>
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
    users: state
  }
}


export default withRouter(connect(mapStateToProps)(App));
