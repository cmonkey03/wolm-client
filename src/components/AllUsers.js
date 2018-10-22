import React from 'react';
import { connect } from 'react-redux';
import PaginationTable from './PaginationTable';

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableColumns: ['ID', 'Username', 'Zipcode', 'Bio', 'Reservations'],
      itemCount: 10
    }
  }

  render() {
    return (
      <PaginationTable  items={this.props.users}
                        {...this.state}
                        tableName="Users"
                        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  }
}

export default connect(mapStateToProps)(AllUsers);
