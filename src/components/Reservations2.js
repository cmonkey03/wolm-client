import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import withAuth from '../hocs/withAuth';
import { cancelReservation } from '../actions/reservation';
import { loadTours } from '../actions/tour';
import { fetchCurrentUser } from '../actions/user';
import {
  Button,
  Form,
  Grid,
  Image,
  Segment
} from 'semantic-ui-react';

class Reservations2 extends React.Component  {

  reservationTile = (reservations) => {
    return (reservations.reduce((accum, reservation) => {
      accum.push(
        <Grid.Column key={reservation.id}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          Title
          {moment(reservation.tour.start_time).format("LLLL")}
          {moment(reservation.tour.end_time).format("LLL")}
          {reservation.tour.price}
          {reservation.tour.description}
          <Button size='small' onClick={this.handleCancelReservation} name={reservation.id}>Cancel</Button>
        </Grid.Column>
      )
      return accum;
    }, []))
  }

  handleCancelReservation = (e) => {
    const reservationObj = { id: e.target.name }
    this.props.cancelReservation(reservationObj)
    //loadTours to pessimistically render changes to tour reservations
    this.props.loadTours()
  }

  render() {
    let {reservations} = this.props.user

    return (
      <Form
        loading={this.props.cancellingReservation}
      >
        <Grid padded stackable columns={3}>
          { reservations && this.reservationTile(reservations) }
        </Grid>
      </Form>
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
