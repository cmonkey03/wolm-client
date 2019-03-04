import React from 'react';

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

export default Reservations2;
