import React from 'react';
import { connect } from 'react-redux';

const AllTours = (props) => {
  return(
    <h3>Display all tours</h3>
  )
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours
  }
}

export default connect(mapStateToProps)(AllTours);
