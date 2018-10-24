import React from 'react';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { Button, Header, Form, Icon, Menu, Message, Table } from 'semantic-ui-react';
import moment from 'moment';
import { cancelReservation } from '../actions/reservation';

const Reservations = (props) => {
  const reservationRow = (reservations) => {
    return (reservations.map((reservation) => {
      return (<Table.Row key={reservation.id}>
            <Table.Cell textAlign='center'><Button size='small' onClick={handleCancelReservation} name={reservation.id}>Cancel</Button></Table.Cell>
            <Table.Cell>{moment(reservation.tour.start_time).format("LLLL")}</Table.Cell>
            <Table.Cell>{moment(reservation.tour.end_time).format("LLL")}</Table.Cell>
            <Table.Cell>{reservation.tour.price}</Table.Cell>
          </Table.Row>)
    }))
  }

  const handleCancelReservation = (e) => {
    const reservationObj = { id: e.target.name }
    props.cancelReservation(reservationObj)
  }
  console.log(props)
  return (
    <React.Fragment>
      {props.successResponse && !props.successResponse.tour && <Message success header={props.successResponse.message}/>}
      <Header as='h3' attached='top' inverted color='teal'>Your Reservations</Header>
      <Form
        loading={props.cancellingReservation}
      >
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
            { props.user.reservations && reservationRow(props.user.reservations) }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
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
      </Form>
    </React.Fragment>
  )
}

const mapStateToProps = ({ users: { user , loggedIn },
  reservations: { cancellingReservation }}) => ({
    user,
    loggedIn,
    cancellingReservation
})

export default withAuth(connect(mapStateToProps, { cancelReservation })(Reservations));
