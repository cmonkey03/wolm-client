import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import NavBar from '../components/NavBar';

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
