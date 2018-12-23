import React, { Component, Fragment } from 'react';
import NavBar from '../components/NavBar';

class HomepageLayout extends Component {
  render() {
    return (
      <Fragment>
        <div className='hero-image'>
          <p className='hero-text'>Website</p>
          <p className='hero-text'>Of</p>
          <p className='hero-text'>Lower</p>
          <p className='hero-text'>Manhattan</p>
        </div>
        <NavBar />
      </Fragment>
    )
  }
}

export default HomepageLayout;
