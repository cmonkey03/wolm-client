import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import { cancelReservation } from '../actions/reservation';
import { loadTours } from '../actions/tour';
import { fetchCurrentUser } from '../actions/user';
import {
  Container,
  Grid,
  Image
} from 'semantic-ui-react';

class Reservations2 extends React.Component  {

  reservationTile = (reservations) => {
    return (reservations.reduce((accum, reservation) => {
      accum.push(
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
      )
      return accum;
    }, []))
  }

  render() {
    let {reservations} = this.props.user

    return (
      <Grid padded columns={3}>
        { reservations && this.reservationTile(reservations) }
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
