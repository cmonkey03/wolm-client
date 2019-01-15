import React, { Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'
// import NavBar from '../components/NavBar';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
* such things.
*/

const src1 = '/fraunces-tavern.jpg'
const src2 = '/collect-pond.png'

const HomepageLayout = () => (
  <Fragment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Centuries of New York History Awaits You
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Our guides bring you through Native Lenape history to the free spirit of Dutch
              settlers to an American rebellion against British Colonial might.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Website of Lower Manhattan
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We offer curated tours of New York that bring together locals and our mobile
              application to bring you a historical tour of New York City like no other.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src={src1} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <NavLink to='/tours'>
            <Button size='huge'>Check Out Our Tours</Button>
            </NavLink>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "And I thought New York today was crazy"
            </Header>
            <p style={{ fontSize: '1.33em' }}>Eighteenth century New York awaits you.</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "I'm glad we picked this tour. We're all disturbed, and fascinated."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src={src1} />
              <b>Emil</b> Banana salesman and father of twelve
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Beheaded: a guide to headless New York
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          For centuries New York has been home to many famous headless residents. On this
          tour meet "Sleepy Hollow" author Washington Irving, pre-American Revolution
          revolutionaries and the decapitation of the many heads of King George III.
        </p>
        <Button as='a' size='large'>
          Um, yes.
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href={src2}>Maps</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          We're Under Attack! The Invasions of New York
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          From Lenape mass burials to successive waves of colonization to attacks
          on the the Statue of Liberty and World Trade Centers, New York has never
          been far from danger. Learn how it went down.
        </p>
        <Button as='a' size='large'>
          Interesting...
        </Button>
      </Container>
    </Segment>
    </Fragment>
)

export default HomepageLayout;
