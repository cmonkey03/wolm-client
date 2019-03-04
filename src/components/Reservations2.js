import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import { cancelReservation } from '../actions/reservation';
import { loadTours } from '../actions/tour';
import { fetchCurrentUser } from '../actions/user';
import { Grid, Image } from 'semantic-ui-react';

class Reservations2 extends React.Component  {
  render() {
    return (
      <Grid>
        <Grid.Row columns={3}>
           <Grid.Column>
             <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
           </Grid.Column>
           <Grid.Column>
             <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
           </Grid.Column>
           <Grid.Column>
             <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
           </Grid.Column>
         </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({ users: { user, loggedIn},
  reservations: { cancellingReservation }}) => ({
    user,
    loggedIn,
    cancellingReservation
  })

export default withAuth(connect(mapStateToProps, { cancelReservation, fetchCurrentUser, loadTours })(Reservations2));
