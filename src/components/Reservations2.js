import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';

class Reservations2 extends React.Component  {
  render() {
    return <div></div>
  }
}

const mapStateToProps = ({ users: { user, loggedIn},
  reservations: { cancellingReservation }}) => ({
    user,
    loggedIn,
    cancellingReservation
  })

export default withAuth(connect(mapStateToProps)(Reservations2));
