import React, { Component, Fragment } from 'react';
import NavBar from '../components/NavBar';

class HomepageLayout extends Component {
  render() {
    return (
      <Fragment>
        <div className='home-image'>
          <p className='home-text'>Website</p>
          <p className='home-text'>Of</p>
          <p className='home-text'>Lower</p>
          <p className='home-text'>Manhattan</p>
        </div>
        <NavBar />
      </Fragment>
    )
  }
}

export default HomepageLayout;
