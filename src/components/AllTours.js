import React from 'react';
import { connect } from 'react-redux';
import PaginationTable from './PaginationTable';

class AllTours extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableColumns: ['ID', 'Start Time', 'End Time', 'Description', 'Price', 'Reservations'],
      itemCount: 10
    }
  }

  render() {
    return(
      <PaginationTable  items={this.props.tours}
                        {...this.state}
                        tableName="Tours"
                        mobile
                        />
    )
  }
}

const mapStateToProps = ({tours: {tours}}) => ({tours})

export default connect(mapStateToProps)(AllTours);
