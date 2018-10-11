import React, { Component } from 'react';
import '../App.css';
import store from '../store';
import ApiAdapter from '../adapter';
import { connect } from 'react-redux';
import { LOAD_API_DATA } from '../actions';

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
    console.log(this.props)
    return (
      <div className="App">
        WOLM
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}


export default connect(mapStateToProps)(App);
