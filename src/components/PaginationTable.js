import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Header,
  Icon,
  Menu,
  Table
} from 'semantic-ui-react';

export default class PaginationTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayIndex: 0 }
  }

  generateColumnsHeader = (tableColumns) => {
    return tableColumns.map((header) => {
      return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
    })
  }

  //generateRow needs control flow statements to handle value types
  generateRow = (item, tableColumns) => {
    return tableColumns.map((data) => {
      const key = data.toLowerCase().split(' ').join('_')
      if (Array.isArray(item[key])) {
        return <Table.Cell key={data + item[key]}>{item[key].length}</Table.Cell>
      } else if (key.includes("time")) {
        return <Table.Cell key={data + item[key]}>{moment(item[key]).format("LLLL")}</Table.Cell>
      } else if (Number.isInteger(item[key])) {
        return <Table.Cell key={data + item[key]}>{item[key]}</Table.Cell>
      } else if (typeof item[key] === 'string') {
        return <Table.Cell key={data + item[key]}>{item[key]}</Table.Cell>
      } else if (Number.isInteger(item[key]['id'])) {
        return <Table.Cell key={data + item[key]}>{item[key]['id']}</Table.Cell>
      } else {
        return null
      }
    })
  }
  generateTableRows = (items, tableColumns) => {
    return items.map((item) => (
        <Table.Row key={Object.values(item)}>
          { this.generateRow(item, tableColumns) }
        </Table.Row>
      )
    )
  }
  generateSelectedRows = (items, tableColumns, itemCount, displayIndex) => {
    const index = displayIndex * itemCount
    const userArray = items.slice(index,index+itemCount )

    return this.generateTableRows(userArray, tableColumns)
  }

  footerMenuLength = (items, itemCount) => Math.ceil(items.length / itemCount)
  generateFooterMenuItems = (footerMenuLength) => {
    let footerMenuItems = []
    for (let i = 1; i <= footerMenuLength; i++) {
      footerMenuItems.push(<Menu.Item as='a'
        onClick={this.handleClickFooterMenu}
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

  handleClickFooterMenu = (e) => {
    if (e.target.id === 'user chevron left' && this.state.displayIndex > 0) {
      this.setState({displayIndex: this.state.displayIndex - 1})
    } else if (e.target.id === 'user chevron right' && this.state.displayIndex < (this.footerMenuLength(this.props.items, this.props.itemCount) - 1)) {
      this.setState({displayIndex: this.state.displayIndex + 1})
    } else if (Number.isInteger(parseInt(e.target.id))) {
      this.setState({displayIndex: e.target.id-1})
    }
  }

  renderTable = (items, tableColumns, itemCount, displayIndex) => {
    return (
      <React.Fragment>
        <Header as='h3' attached='top' inverted color='grey'>{this.props.tableName}</Header>
        <Table celled attached>
          <Table.Header>
            <Table.Row>
              { this.generateColumnsHeader(tableColumns) }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { items.length > 0 && this.generateSelectedRows(items,
                                                            tableColumns,
                                                            itemCount,
                                                            displayIndex)}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left'
                      onClick={this.handleClickFooterMenu}
                      id='user chevron left'
                      />
                  </Menu.Item>
                  { this.generateFooter(items, itemCount) }
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right'
                      onClick={this.handleClickFooterMenu}
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
        { this.renderTable( this.props.items,
                            this.props.tableColumns,
                            this.props.itemCount,
                            this.state.displayIndex)}
      </React.Fragment>
    )
  }

}
