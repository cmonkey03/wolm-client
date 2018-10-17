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
      <PaginationTable items={this.props.reservations} {...this.state} tableName="Reservations"/>)
  }
}

const mapStateToProps = (state) => {
  return {
    reservations: state.reservations
  }
}

export default connect(mapStateToProps)(AllReservations);

// const AllReservations = (props) => {
// const reservationRow = (reservations) => {
//   return (reservations.map((reservation) => (
//       <Table.Row key={reservation.id}>
//         <Table.Cell>{reservation.id}</Table.Cell>
//         <Table.Cell>{reservation.user.id}</Table.Cell>
//         <Table.Cell>{reservation.tour.id}</Table.Cell>
//       </Table.Row>)))
// }

// <React.Fragment>
//   <Header as='h3' attached='top' inverted color='green'>Reservations</Header>
//   <Table celled attached>
//   <Table.Header>
//     <Table.Row>
//       <Table.HeaderCell>ID</Table.HeaderCell>
//       <Table.HeaderCell>User ID</Table.HeaderCell>
//       <Table.HeaderCell>Tour ID</Table.HeaderCell>
//     </Table.Row>
//   </Table.Header>
//   <Table.Body>
//     { props.reservations && reservationRow(props.reservations) }
//   </Table.Body>
//   <Table.Footer>
//     <Table.Row>
//       <Table.HeaderCell colSpan='3'>
//         <Menu floated='right' pagination>
//           <Menu.Item as='a' icon>
//             <Icon name='chevron left'/>
//           </Menu.Item>
//           <Menu.Item as='a' name='1'/>
//           <Menu.Item as='a' name='2'/>
//           <Menu.Item as='a' name='3'/>
//           <Menu.Item as='a' name='4'/>
//           <Menu.Item as='a' name='5'/>
//           <Menu.Item as='a' icon>
//             <Icon name='chevron right'/>
//           </Menu.Item>
//         </Menu>
//       </Table.HeaderCell>
//     </Table.Row>
//   </Table.Footer>
// </Table>
// </React.Fragment>
//
