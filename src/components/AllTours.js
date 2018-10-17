import React from 'react';
import { connect } from 'react-redux';
import PaginationTable from './PaginationTable';

class AllTours extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableColumns: ['ID', 'Start Time', 'End Time', 'Price', 'Reservations'],
      itemCount: 5
    }
  }

  render() {
    return(
      <PaginationTable  items={this.props.tours}
                        {...this.state}
                        tableName="Tours"
                        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours
  }
}

export default connect(mapStateToProps)(AllTours);
