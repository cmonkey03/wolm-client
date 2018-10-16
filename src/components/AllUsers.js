import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

const AllUsers = (props) => {
// To Build Table Pagination:
// 1. Create footer menu items that are linked to users to be displayed
// 2. Create arrays of users to be displayed
// 3. Build event handlers for links to be connected to arrays of users
// 4. Build event handlers to toggle forward or backward through footer menu items

  const numOfFooterMenuItems = Math.ceil(props.users.length / 10)
  const generateFooterMenuItems = (numOfFooterMenuItems) => {
    let footerMenuItems = []
    for (let i = 1; i <= numOfFooterMenuItems; i++) {
      footerMenuItems.push(<Menu.Item as='a' name={i}/>)
    }
    return footerMenuItems;
  }

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
              { generateFooterMenuItems(numOfFooterMenuItems) }
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
