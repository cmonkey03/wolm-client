import React from 'react';
import { connect } from 'react-redux';

const AllReservations = (props) => {
  return(
    <h3>Display all reservations</h3>
  )
}

const mapStateToProps = (state) => {
  return {
    reservations: state.reservations
  }
}

export default connect(mapStateToProps)(AllReservations);
