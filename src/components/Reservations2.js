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
  Header,
  Grid,
  Image,
  Segment
} from 'semantic-ui-react';

class Reservations2 extends React.Component  {

  reservationTile = (reservations) => {
    // Explore Semantic UI Cards: https://react.semantic-ui.com/elements/placeholder/#types-card
    return (reservations.reduce((accum, reservation) => {
      accum.push(
        <Grid.Column key={reservation.id}>
          <Segment attached align='center'>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Header as='h3'>Title</Header>
            <p>{moment(reservation.tour.start_time).format("LLLL")}</p>
            <p>End: {moment(reservation.tour.end_time).format("h:hh a")}  Price: ${reservation.tour.price}
            </p>
            {reservation.tour.description}
          </Segment>
          <Button
            attached='bottom'
            size='small'
            id={reservation.id}
            onClick={this.handleCancelReservation}
          >
            Cancel
          </Button>
        </Grid.Column>
      )
      return accum;
    }, []))
  }

  handleCancelReservation = (e) => {
    const reservationObj = { id: e.target.id }
    this.props.cancelReservation(reservationObj)
    //loadTours to pessimistically render changes to tour reservations
    this.props.loadTours()
  }

  render() {
    const {reservations} = this.props.user

    return (
      <React.Fragment>
        <Header as='h3' attached='top' inverted textAlign='center'>Your Reservations</Header>
        <Form loading={this.props.cancellingReservation}>
          <Grid padded stackable columns={3}>
            { reservations && this.reservationTile(reservations) }
          </Grid>
        </Form>
      </React.Fragment>
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
