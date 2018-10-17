import React from 'react';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

export default class PaginationTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedFooterMenuNumber: 0 }
  }
  generateColumnsHeader = (tableColumns) => {
    return tableColumns.map((header) => {
      return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
    })
  }

  generateTableArrays = (items, itemCount) => {
    let arrayOfArrays = []
    for (let i = 0; i < items.length; i+=itemCount) {
      arrayOfArrays.push(items.slice(i,i+itemCount));
    }
    return arrayOfArrays;
  }
  generateRow = (item, tableColumns) => {
    return tableColumns.map((data) => {
      const dataLowerCase = data.toLowerCase()
      if (Array.isArray(item[dataLowerCase])) {
        return <Table.Cell key={data + item[dataLowerCase]}>{item[dataLowerCase].length}</Table.Cell>
      } else {
        return <Table.Cell key={data + item[dataLowerCase]}>{item[dataLowerCase]}</Table.Cell>
      }
    })
  }
  generateTableRows = (items, tableColumns) => {
    return items.map((item) => {
      return (
        <Table.Row key={Object.values(item)}>
          { this.generateRow(item, tableColumns) }
        </Table.Row>
        )
    })
  }
  generateSelectedRows = (items, tableColumns, itemCount, selectedFooterMenuNumber) => {
    const userArray = this.generateTableArrays(items, itemCount)
    return this.generateTableRows(userArray[selectedFooterMenuNumber], tableColumns)
  }

  footerMenuLength = (items, itemCount) => Math.ceil(items.length / itemCount)
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
  generateFooter = (items, itemCount) => {
    const menuLength = this.footerMenuLength(items, itemCount)
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

  renderTable = (items, tableColumns, itemCount, selectedFooterMenuNumber) => {
    return (
      <React.Fragment>
        <Header as='h3' attached='top' inverted color='red'>Users</Header>
        <Table celled attached>
          <Table.Header>
            <Table.Row>
              { this.generateColumnsHeader(tableColumns) }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { items.length > 1 && this.generateSelectedRows(items,
                                                            tableColumns,
                                                            itemCount,
                                                            selectedFooterMenuNumber)}
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
                  { this.generateFooter(items, itemCount) }
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
        { this.renderTable( this.props.users,
                            this.props.tableColumns,
                            this.props.itemCount,
                            this.state.selectedFooterMenuNumber)}
      </React.Fragment>
    )
  }

}
