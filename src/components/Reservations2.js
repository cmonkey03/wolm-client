import React from 'react';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(Reservations2);
