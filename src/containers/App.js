import React, { Component, Fragment } from 'react';
import '../App.css';
import { Redirect, withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import HomepageLayout from '../components/HomepageLayout';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EditProfile from '../components/EditProfile';
import Reservations from '../components/Reservations';
import AdminPanel from './AdminPanel';
import CreateTour from '../components/CreateTour';
import MakeReservation from '../components/MakeReservation';
import TourInfo from '../components/TourInfo';
import ResponsiveHeader from '../components/ResponsiveHeader';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    return (
      <ResponsiveHeader>
        <div
          className='app'
          style={{ padding:'5em', paddingTop:'3em' }}>
          <Switch>
            <Redirect exact path="/" to="/home"/>
            <Route exact path="/home" component={HomepageLayout} />
            <Route exact path="/tours" component={TourInfo} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/new-tour" component={CreateTour} />
            <Route exact path="/reservations"
              render={ (renderProps) => {
                return (
                  <Fragment>
                    <Reservations />
                    <MakeReservation />
                  </Fragment>
                )
              }
            }
            />
          </Switch>
        </div>
        <Footer/>
      </ResponsiveHeader>
    );
  }
}

export default withRouter(App);
