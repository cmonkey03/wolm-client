import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu, Table } from 'semantic-ui-react';

const AllReservations = (props) => {
  const reservationRow = (reservations) => {
    return (reservations.map((reservation) => (
        <Table.Row key={reservation.id}>
          <Table.Cell>{reservation.id}</Table.Cell>
          <Table.Cell>{reservation.paid.toString()}</Table.Cell>
          <Table.Cell>{reservation.user_id}</Table.Cell>
          <Table.Cell>{reservation.tour_id}</Table.Cell>
        </Table.Row>)))
  }

  return(
    <React.Fragment>
      <h3>Reservations</h3>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Paid</Table.HeaderCell>
          <Table.HeaderCell>User ID</Table.HeaderCell>
          <Table.HeaderCell>Tour ID</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { props.reservations && reservationRow(props.reservations) }
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
  </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    reservations: state.reservations
  }
}

export default connect(mapStateToProps)(AllReservations);
