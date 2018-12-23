import React, { Component, Fragment } from 'react';
import NavBar from '../components/NavBar';

class HomepageLayout extends Component {
  render() {
    return (
      <Fragment>
        <img
          className="home-image"
          alt="1892 NY Harbor"
          src="/1892-nyc-currier-ives-1920-1080.jpg"
        />
        <div>
          <p className='wolm-intro'>Website</p>
          <p className='wolm-intro'>Of</p>
          <p className='wolm-intro'>Lower</p>
          <p className='wolm-intro'>Manhattan</p>
        </div>
        <NavBar />
      </Fragment>
    )
  }
}

export default HomepageLayout;
