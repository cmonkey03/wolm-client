import React from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from '../components/NavBar';

const HomepageLayout = () => (
  <React.Fragment>
    <Container className='home-background' fluid attached="top">
        <p className='home-text'>Website</p>
        <p className='home-text'>Of</p>
        <p className='home-text'>Lower</p>
        <p className='home-text'>Manhattan</p>
      
    </Container>
    <NavBar attached='bottom'/>
  </React.Fragment>
)


export default HomepageLayout;
