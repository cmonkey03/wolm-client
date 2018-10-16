import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Menu, Table } from 'semantic-ui-react';
import moment from 'moment';

const MakeReservation = (props) => {

  const tourRow = (tours) => {
    return (tours.map((tour) => {
      return (<Table.Row key={tour.id}>
            <Table.Cell textAlign='center'><Button size='small' onClick={props.handleTourSelect} name={tour.id}>{tour.id}</Button></Table.Cell>
            <Table.Cell>{moment(tour.start_time).format("LLLL")}</Table.Cell>
            <Table.Cell>{moment(tour.end_time).format("LLL")}</Table.Cell>
            <Table.Cell>{tour.price}</Table.Cell>
            <Table.Cell>{tour.reservations.length}</Table.Cell>
          </Table.Row>)
    }))
  }

  return(
    <React.Fragment>
      <Header as='h2'>Make a Reservation</Header>
      <Header as='h3' attached='top' inverted color='teal'>Tours</Header>
      <Table celled attached>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Select Tour</Table.HeaderCell>
          <Table.HeaderCell>Start Time</Table.HeaderCell>
          <Table.HeaderCell>End Time</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Reservations</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { props.tours && tourRow(props.tours) }
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='5'>
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
    tours: state.tours
  }
}

export default connect(mapStateToProps)(MakeReservation);
