import React, { Component } from 'react';
import '../App.css';
import store from '../store';
import ApiAdapter from '../adapter';
import { connect } from 'react-redux';
import { LOAD_API_DATA } from '../types';
import { Redirect, withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EditProfile from '../components/EditProfile';
import Reservations from '../components/Reservations';
import AdminPanel from '../components/AdminPanel';
import CreateTour from '../components/CreateTour';
import MakeReservation from '../components/MakeReservation';
import TourInfo from '../components/TourInfo';

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
        <div className='hero-image'>
          <p className='hero-text'>Website</p>
          <p className='hero-text'>Of</p>
          <p className='hero-text'>Lower</p>
          <p className='hero-text'>Manhattan</p>
        </div>
        <NavBar className="navbar" />
        <div className="body">
          <Switch>
            <Redirect exact path="/" to="/home"/>
            <Route exact path="/home"
              render={(renderProps) => {
                return (
                    <img
                      className="ui fluid image"
                      alt="1892 NY Harbor"
                      src="/1892-nyc-currier-ives-1920-1080.jpg"
                    />
                  )
                }
              }
            />
            <Route exact path="/tours" component={TourInfo} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/new-tour" component={CreateTour} />
            <Route exact path="/reservations"
              render={ (renderProps) => {
                return (
                  <React.Fragment>
                    <Reservations />
                    <MakeReservation />
                  </React.Fragment>
                )
              }
            }
            />
          </Switch>
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
