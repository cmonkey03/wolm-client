import React, { Component } from 'react';
import '../App.css';
import store from '../store';
import ApiAdapter from '../adapter';
import { connect } from 'react-redux';
import { LOAD_API_DATA } from '../types';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EditProfile from '../components/EditProfile';
import Reservations from '../components/Reservations';
import AdminPanel from '../components/AdminPanel';
import CreateTour from '../components/CreateTour';
import MakeReservation from '../components/MakeReservation';
// import NotFound from '../components/notFound'
import { Header } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props)
    this.ApiAdapter = new ApiAdapter()
    this.state = {
      errors: null,
      successResponse: null,
      // selectedTourId: null,
      // selectedReservationId: null,
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

  // handleSubmitReservation = (e) => {
  //   const reservationObj = {
  //     user_id: this.state.loggedInUser.id,
  //     tour_id: this.state.selectedTourId
  //   }
  //
  //   this.ApiAdapter.postReservation(reservationObj).then(r=>{
  //     if (r.errors) {
  //       this.setState({errors: r.errors})
  //     } else {
  //       this.setState({
  //         selectedTourId: null,
  //         successResponse: r
  //       })
  //     }
  //   })
  // }
  // handleTourSelect = (e) => this.setState({selectedTourId: parseInt(e.target.name)})

  handleReservationSelect = (e) => this.setState({selectedReservationId: parseInt(e.target.name)})
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
          <NavBar />
          <Route exact path="/login"
            render={ (renderProps) => {
              return (
                <Login />
              )
            }}
            />
          <Route exact path="/signup"
                  render={ (renderProps) => {
                    return <Signup />
            }}
            />
          <Route exact path="/edit-profile"
                  render={ (renderProps) => {
                    return <EditProfile />
                  }}
            />
          <Route exact path="/reservations"
                  render={ (renderProps) => {
                    return (
                      <React.Fragment>
                        <Reservations loggedInUser={this.state.loggedInUser}
                                      successResponse={this.state.successResponse}
                                      handleReservationSelect={this.handleReservationSelect}
                                      handleCancelReservation={this.handleCancelReservation}
                                      />
                        <MakeReservation />
                      </React.Fragment>
                    )
                  }}
            />
          <Route exact path="/admin"
                  render={ (renderProps) => {
                    return (
                      <AdminPanel />
                    )
                  }}
            />
          <Route exact path="/new-tour"
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
    users: state.users.users,
    tours: state.tours,
    reservations: state.reservations
  }
}

export default withRouter(connect(mapStateToProps)(App));
