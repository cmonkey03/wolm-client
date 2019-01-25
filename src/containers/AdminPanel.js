import React, {Component} from 'react';
import withAuth from '../hocs/withAuth';
import store from '../store';
import { connect } from 'react-redux';
import AllUsers from '../components/AllUsers.js';
import AllTours from '../components/AllTours.js';
import AllReservations from '../components/AllReservations.js';
import CreateTour from '../components/CreateTour';
import { Header, Icon } from 'semantic-ui-react';
import { LOAD_API_DATA } from '../types';
import ApiAdapter from '../adapter';

class AdminPanel extends Component {
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
    return(
      <React.Fragment>
        <Header as='h2' icon textAlign='center'>
        <Icon name='settings'/>
        Administrator Panel
        <Header.Subheader>Manage tours, users and reservations.</Header.Subheader>
      </Header>
        <CreateTour/>
        <AllTours />
        <AllUsers />
        <AllReservations />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({users, tours, reservations}) => {
  return {
    users,
    tours,
    reservations
  }
}

export default withAuth(connect(mapStateToProps)(AdminPanel));
