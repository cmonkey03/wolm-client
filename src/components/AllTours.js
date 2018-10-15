import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu, Table } from 'semantic-ui-react';

const AllTours = (props) => {
  const tourRow = (tours) => {
    return (tours.map((tour) => (
        <Table.Row key={tour.id}>
          <Table.Cell>{tour.id}</Table.Cell>
          <Table.Cell>{tour.start_time}</Table.Cell>
          <Table.Cell>{tour.end_time}</Table.Cell>
          <Table.Cell>{tour.price}</Table.Cell>
          <Table.Cell>Tour Reservations</Table.Cell>
        </Table.Row>)))
  }

  return(
    <React.Fragment>
      <h3>Tours</h3>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Start Time</Table.HeaderCell>
          <Table.HeaderCell>Zipcode</Table.HeaderCell>
          <Table.HeaderCell>Bio</Table.HeaderCell>
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

export default connect(mapStateToProps)(AllTours);
