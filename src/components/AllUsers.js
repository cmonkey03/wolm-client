import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFooterMenuNumber: 0,
      itemsPerArr: 10
    }
  }

  handleSelectFooterMenuNumber = (e) => {
    this.setState({selectedFooterMenuNumber: e.target.id-1})
  }
  handleSelectFooterMenuChevron = (e) => {
    if (e.target.id === 'user chevron left' && this.state.selectedFooterMenuNumber > 0) {
      this.setState({selectedFooterMenuNumber: this.state.selectedFooterMenuNumber - 1})
    } else if (e.target.id === 'user chevron right' && this.state.selectedFooterMenuNumber < 7) {
      this.setState({selectedFooterMenuNumber: this.state.selectedFooterMenuNumber + 1})
    }
  }

  footerMenuLength = (items) => Math.ceil(items.length / this.state.itemsPerArr)
  generateFooterMenuItems = (footerMenuLength) => {
    let footerMenuItems = []
    for (let i = 1; i <= footerMenuLength; i++) {
      footerMenuItems.push(<Menu.Item as='a'
                                      onClick={this.handleSelectFooterMenuNumber}
                                      id={i}
                                      key={i}>
                                      {i}
                                    </Menu.Item>)
    }
    return footerMenuItems;
  }
  generateFooter = (items) => {
    const menuLength = this.footerMenuLength(items)
    return this.generateFooterMenuItems(menuLength)
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
  generateSelectedUserRows = (users) => {
    const userArray = this.generateArrayOfArrays(users, this.state.itemsPerArr)
    return this.generateUserRows(userArray[this.state.selectedFooterMenuNumber])
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
          { this.props.users.length > 1 && this.generateSelectedUserRows(this.props.users)}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left'
                        onClick={this.handleSelectFooterMenuChevron}
                        id='user chevron left'
                        />
                </Menu.Item>
                { this.generateFooter(this.props.users) }
                <Menu.Item as='a' icon>
                  <Icon name='chevron right'
                        onClick={this.handleSelectFooterMenuChevron}
                        id='user chevron right'
                        />
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
