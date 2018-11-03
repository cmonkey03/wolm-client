import React, { Component } from 'react';
import '../App.css';
import store from '../store';
import ApiAdapter from '../adapter';
import { connect } from 'react-redux';
import { LOAD_API_DATA } from '../types';
import { Redirect, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EditProfile from '../components/EditProfile';
import Reservations from '../components/Reservations';
import AdminPanel from '../components/AdminPanel';
import CreateTour from '../components/CreateTour';
import MakeReservation from '../components/MakeReservation';
import TourInfo from '../components/TourInfo';
// import NotFound from '../components/notFound'

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
          <NavBar className="navbar" />
          <div className="body">
          <Redirect exact path="/" to="/tours"/>
          <Route exact path="/tours" render={ (renderProps) => (<TourInfo />)} />
          <Route exact path="/login" render={ (renderProps) => (<Login />)} />
          <Route exact path="/signup" render={ (renderProps) => (<Signup />)} />
          <Route exact path="/edit-profile" render={ (renderProps) => (<EditProfile />) } />
          <Route exact path="/admin" render={ (renderProps) => (<AdminPanel />) } />
          <Route exact path="/new-tour" render={ (renderProps) => (<CreateTour />) } />
          <Route exact path="/reservations"
                  render={ (renderProps) => {
                    return (
                      <React.Fragment>
                        <Reservations />
                        <MakeReservation />
                      </React.Fragment>
                    )
                  }}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({users, tours, reservations}) => {
  return {
    users,
    tours,
    reservations
  }
}

export default withRouter(connect(mapStateToProps)(App));
