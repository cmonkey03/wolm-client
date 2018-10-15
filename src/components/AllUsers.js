import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

const AllUsers = (props) => {
  const userRow = (users) => {
    return (users.map((user) => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.zip_postcode}</Table.Cell>
          <Table.Cell>{user.bio}</Table.Cell>
          <Table.Cell>{user.reservations.length}</Table.Cell>
        </Table.Row>)))
  }

  return(
    <React.Fragment>
      <Header as='h3' attached='top' inverted color='red'>Users</Header>
      <Table celled attached>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Zipcode</Table.HeaderCell>
          <Table.HeaderCell>Bio</Table.HeaderCell>
          <Table.HeaderCell>Reservations</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { props.users && userRow(props.users) }
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
    users: state.users
  }
}

export default connect(mapStateToProps)(AllUsers);
