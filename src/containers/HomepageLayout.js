import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import NavBar from '../components/NavBar';



  // <figure className="wolm-intro">
  //   <p className='hero-text'>Website</p>
  //   <p className='hero-text'>Of</p>
  //   <p className='hero-text'>Lower</p>
  //   <p className='hero-text'>Manhattan</p>
  //   </figure>

class HomepageLayout extends Component {

  render() {
    return (
      <Grid>
      <Grid.Row columns='1'>
      <Grid.Column>
      <Image
      alt="1892 NY Harbor"
      src="/1892-nyc-currier-ives-1920-1080.jpg"
      fluid
      />
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column>
      <NavBar />
      </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }
}

export default HomepageLayout;
