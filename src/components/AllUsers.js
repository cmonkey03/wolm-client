import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFooterMenuItem: 0,
      itemsPerArr: 10
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

  generateArrayOfArrays = (array, itemsPerArr) => {
    let arrayOfArrays = []
    for (let i = 0; i < array.length; i+=itemsPerArr) {
      arrayOfArrays.push(array.slice(i,i+itemsPerArr));
    }
    return arrayOfArrays;
  }
  generateUserRows = (users) => {
    return (users.map((user) => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.zip_postcode}</Table.Cell>
          <Table.Cell>{user.bio}</Table.Cell>
          {user.reservations && <Table.Cell>{user.reservations.length}</Table.Cell>}
        </Table.Row>)))
  }
  generateSelectedUserRows = (users, itemsPerArr) => {
    const userArray = this.generateArrayOfArrays(users, itemsPerArr)
    return this.generateUserRows(userArray[this.state.selectedFooterMenuItem])
  }

  handleSelectFooterMenuItem = (e) => {
    this.setState({selectedFooterMenuItem: e.target.id-1})
  }
  handleSelectFooterMenuChevron = (e) => {
    if (e.target.id === 'user chevron left' && this.state.selectedFooterMenuItem > 0) {
      this.setState({selectedFooterMenuItem: this.state.selectedFooterMenuItem - 1})
    } else if (e.target.id === 'user chevron right' && this.state.selectedFooterMenuItem < 7) {
      this.setState({selectedFooterMenuItem: this.state.selectedFooterMenuItem + 1})
    }
  }

  render() {
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
          { this.props.users.length > 1 && this.generateSelectedUserRows(this.props.users, this.state.itemsPerArr)}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' onClick={this.handleSelectFooterMenuChevron} id='user chevron left'/>
                </Menu.Item>
                { this.generateFooterMenuItems(this.numOfFooterMenuItems(this.props.users, this.state.itemsPerArr)) }
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' onClick={this.handleSelectFooterMenuChevron} id='user chevron right'/>
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
