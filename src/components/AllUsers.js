import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

class AllUsers extends React.Component {
// To Build Table Pagination:
// DONE 1. Create footer menu items that are linked to users to be displayed
// DONE 2. Create arrays of users to be displayed
// 3. Build event handlers for links to be connected to arrays of users
// 4. Build event handlers to toggle forward or backward through footer menu items
  constructor(props) {
    super(props)
    this.state = {
      selectedUserArray: 0
    }
  }

  numOfFooterMenuItems = (items, itemsPerArr) => Math.ceil(items.length / itemsPerArr)

  generateFooterMenuItems = (numOfFooterMenuItems) => {
    let footerMenuItems = []
    for (let i = 1; i <= numOfFooterMenuItems; i++) {
      footerMenuItems.push(<Menu.Item as='a' onClick={this.handleSelectFooterMenuItem} id={i} key={i}>{i}</Menu.Item>)
    }
    return footerMenuItems;
  }

  generateArrayOfArrays = (array, size) => {
    let arrayOfArrays = []
    for (let i = 0; i < array.length; i+=size) {
      arrayOfArrays.push(array.slice(i,i+size));
    }
    return arrayOfArrays;
  }

  userRows = (users) => {
    return (users.map((user) => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.zip_postcode}</Table.Cell>
          <Table.Cell>{user.bio}</Table.Cell>
          <Table.Cell>{user.reservations.length}</Table.Cell>
        </Table.Row>)))
  }

  handleSelectFooterMenuItem = (e) => {
    this.setState({selectedUserArray: e.target.id-1})
  }

  render() {
    let userArray = this.generateArrayOfArrays(this.props.users, 10)[this.state.selectedUserArray]
    return (
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
          { this.props.users && this.userRows(this.props.users) }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left'/>
                </Menu.Item>
                { this.generateFooterMenuItems(this.numOfFooterMenuItems(this.props.users, 10)) }
                <Menu.Item as='a' icon>
                  <Icon name='chevron right'/>
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>)
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(AllUsers);
