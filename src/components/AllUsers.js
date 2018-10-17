import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFooterMenuNumber: 0,
      itemCount: 10,
      tableColumns: ['ID', 'Username', 'Zipcode', 'Bio', 'Reservations'],
    }
  }

  generateColumnsHeader = () => {
    return this.state.tableColumns.map((header) => {
      return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
    })
  }

  generateTableArrays = (items) => {
    let arrayOfArrays = []
    for (let i = 0; i < items.length; i+=this.state.itemCount) {
      arrayOfArrays.push(items.slice(i,i+this.state.itemCount));
    }
    return arrayOfArrays;
  }
  generateRow = (item) => {
    return this.state.tableColumns.map((data) => {
      const dataLowerCase = data.toLowerCase()
      if (Array.isArray(item[dataLowerCase])) {
        return <Table.Cell key={data + item[dataLowerCase]}>{item[dataLowerCase].length}</Table.Cell>
      } else {
        return <Table.Cell key={data + item[dataLowerCase]}>{item[dataLowerCase]}</Table.Cell>
      }
    })
  }
  generateTableRows = (items) => {
    return items.map((item) => {
      return (
        <Table.Row key={Object.values(item)}>
          { this.generateRow(item) }
        </Table.Row>
        )
    })
  }
  generateSelectedRows = (items) => {
    const userArray = this.generateTableArrays(items)
    return this.generateTableRows(userArray[this.state.selectedFooterMenuNumber])
  }

  footerMenuLength = (items) => Math.ceil(items.length / this.state.itemCount)
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

  renderTable = () => {
    return (
      <React.Fragment>
        <Header as='h3' attached='top' inverted color='red'>Users</Header>
        <Table celled attached>
          <Table.Header>
            <Table.Row>
              { this.generateColumnsHeader() }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.props.users.length > 1 && this.generateSelectedRows(this.props.users)}
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
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderTable() }
      </React.Fragment>)
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(AllUsers);
