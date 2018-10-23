import React from 'react';
import { connect } from 'react-redux';
import PaginationTable from './PaginationTable';

class AllReservations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableColumns: ['ID', 'User', 'Tour'],
      itemCount: 10
    }
  }

  render() {
    return (
      <PaginationTable  items={this.props.reservations}
                        {...this.state}
                        tableName="Reservations"/>)
  }
}

const mapStateToProps = ({reservations}) => ({reservations})

export default connect(mapStateToProps)(AllReservations);
