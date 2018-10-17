import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFooterMenuNumber: 0,
      itemsToDisplay: 10,
      tableColumns: ['ID', 'Username', 'Zipcode', 'Bio', 'Reservations'],
    }
  }

  generateHeader = () => {
    return this.state.tableColumns.map((header) => {
      return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
    })
  }

  generateTableArrays = (array, itemsToDisplay) => {
    let arrayOfArrays = []
    for (let i = 0; i < array.length; i+=itemsToDisplay) {
      arrayOfArrays.push(array.slice(i,i+itemsToDisplay));
    }
    return arrayOfArrays;
  }
  generateRow = (user) => {
    return this.state.tableColumns.map((data) => {
      const dataLowerCase = data.toLowerCase()
      if (dataLowerCase === 'reservations') {
        return <Table.Cell key={user[data]}>{user[dataLowerCase].length}</Table.Cell>
      } else {
        return <Table.Cell key={user[data]}>{user[data]}</Table.Cell>
      }
    })
  }
  generateTableRows = (users) => {
    return users.map((user) => {
      return (
        <Table.Row key={user[this.state.tableColumns[0]]}>
          { this.generateRow(user) }
        </Table.Row>
        )
    })
  }
  generateSelectedUserRows = (users) => {
    const userArray = this.generateTableArrays(users, this.state.itemsToDisplay)
    return this.generateTableRows(userArray[this.state.selectedFooterMenuNumber])
  }

  footerMenuLength = (items) => Math.ceil(items.length / this.state.itemsToDisplay)
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

  render() {
    return (
      <React.Fragment>
        <Header as='h3' attached='top' inverted color='red'>Users</Header>
        <Table celled attached>
        <Table.Header>
          <Table.Row>
            { this.generateHeader() }
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
