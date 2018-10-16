import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Menu, Message, Table } from 'semantic-ui-react';
import moment from 'moment';

const Reservations = (props) => {
  const userReservations = props.reservations.filter((reservation) => reservation.user.id === props.loggedInUser.id )

  const reservationRow = (reservations) => {
    return (reservations.map((reservation) => {
      return (<Table.Row key={reservation.id}>
            <Table.Cell textAlign='center'><Button size='small' onClick={props.handlReservationSelect} name={reservation.id}>Select</Button></Table.Cell>
            <Table.Cell>{moment(reservation.tour.start_time).format("LLLL")}</Table.Cell>
            <Table.Cell>{moment(reservation.tour.end_time).format("LLL")}</Table.Cell>
            <Table.Cell>{reservation.tour.price}</Table.Cell>
          </Table.Row>)
    }))
  }

  return(
    <React.Fragment>
      {props.successResponse && !props.successResponse.tour && <Message success header={props.successResponse.message}/>}
      <Header as='h3' attached='top' inverted color='teal'>Your Reservations</Header>
      <Table celled attached>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Select Tour</Table.HeaderCell>
          <Table.HeaderCell>Start Time</Table.HeaderCell>
          <Table.HeaderCell>End Time</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { props.reservations && reservationRow(userReservations) }
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='4'>
            <Button onClick={props.handleCancelReservation}>Cancel Reservation</Button>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='chevron left'/>
              </Menu.Item>
              <Menu.Item as='a' name='1'/>
              <Menu.Item as='a' name='2'/>
              <Menu.Item as='a' name='3'/>
              <Menu.Item as='a' name='4'/>
              <Menu.Item as='a' name='5'/>
              <Menu.Item as='a' icon>
                <Icon name='chevron right'/>
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    reservations: state.reservations
  }
}

export default connect(mapStateToProps)(Reservations);
