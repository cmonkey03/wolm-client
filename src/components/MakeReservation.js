import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import moment from 'moment';
import { createReservation } from '../actions/reservation';
import { unmountMakeReservation } from '../actions/reservation';
import { loadTours } from '../actions/tour';
import {
  Button,
  Form,
  Header,
  Message,
  Table
} from 'semantic-ui-react';

class MakeReservation extends React.Component {
  componentDidMount() {
    this.props.loadTours()
  }

  componentWillUnmount() {
    this.props.unmountMakeReservation()
  }

  findTour(tour_id, tours) {
    const tour = tours.find((tour) => tour.id === tour_id)
    return tour
  }

  handleSubmitReservation = (e) => {
    const reservationObj = {
      user_id: this.props.user.id,
      tour_id: parseInt(e.target.name)
    }

    this.props.createReservation(reservationObj)
    //loadTours to pessimistically render changes to tour reservations
    this.props.loadTours()
  }

  // tourRow = (tours) => {
  //   return (tours.reduce((accum, tour) => {
  //     return accum.push(
  //         <Table.Row key={tour.id}>
  //           <Table.Cell textAlign='center'><Button size='small' onClick={this.handleSubmitReservation} name={tour.id}>Book This Tour</Button></Table.Cell>
  //           <Table.Cell>{moment(tour.start_time).format("LLLL")}</Table.Cell>
  //           <Table.Cell>{moment(tour.end_time).format("LLL")}</Table.Cell>
  //           <Table.Cell>{tour.price}</Table.Cell>
  //           <Table.Cell>{tour.reservations.length}</Table.Cell>
  //         </Table.Row>)
  //     }, [])
  //   )
  // }

  tourRow = (tours) => (tours.map((tour) => {
      if (moment(tour.start_time) > moment()) {
        return (<Table.Row key={tour.id}>
          <Table.Cell textAlign='center'><Button size='small' onClick={this.handleSubmitReservation} name={tour.id}>Book This Tour</Button></Table.Cell>
          <Table.Cell>{moment(tour.start_time).format("LLLL")}</Table.Cell>
          <Table.Cell>{moment(tour.end_time).format("LLL")}</Table.Cell>
          <Table.Cell>{tour.price}</Table.Cell>
          <Table.Cell>{tour.reservations.length}</Table.Cell>
        </Table.Row>)
      }
    }))

    // tourRow = (tours) => (tours.map((tour) => {
  //     if (moment(tour.start_time) > moment()) {
  //       return (<Table.Row key={tour.id}>
  //         <Table.Cell textAlign='center'><Button size='small' onClick={this.handleSubmitReservation} name={tour.id}>Book This Tour</Button></Table.Cell>
  //         <Table.Cell>{moment(tour.start_time).format("LLLL")}</Table.Cell>
  //         <Table.Cell>{moment(tour.end_time).format("LLL")}</Table.Cell>
  //         <Table.Cell>{tour.price}</Table.Cell>
  //         <Table.Cell>{tour.reservations.length}</Table.Cell>
  //       </Table.Row>)
  //     }
  //   }))

  render() {
    return (
      <React.Fragment>
        <Header as='h2'textAlign='center'>Make a Reservation</Header>
        {this.props.successResponse && this.props.successResponse.tour && <Message
          success
          header={this.props.successResponse.message}
          />}
        <Header as='h3' attached='top' inverted textAlign='center'>Tours</Header>
          <Form
            success={!!this.props.successMessage}
            loading={this.props.makingReservation}
          >
          <Message
            success
            header={this.props.successMessage}
            content={!!this.props.confirmedTour ?
              "See you " + moment(this.props.confirmedTour.start_time).format("LLLL") + "!"
              :
              null
            }
            />
          <Table celled attached>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Select Tour</Table.HeaderCell>
                <Table.HeaderCell>Start Time</Table.HeaderCell>
                <Table.HeaderCell>End Time</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Reservations</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.props.tours && this.tourRow(this.props.tours) }
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='5'>
                  {/*<Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left'/>
                    </Menu.Item>
                    <Menu.Item as='a' name='1'/>
                    <Menu.Item as='a' name='2'/>
                    <Menu.Item as='a' name='3'/>
                    <Menu.Item as='a' name='4'/>
                    <Menu.Item as='a' name='5'/>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right'/>
                    </Menu.Item>
                  </Menu>*/}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Form>
    </React.Fragment>)
  }
}

const mapStateToProps = ({tours: { tours }, users: { user, loggedIn },
  reservations: { makingReservation, successMessage, confirmedTour }}) => ({
    tours,
    user,
    loggedIn,
    makingReservation,
    successMessage,
    confirmedTour
  })

export default withAuth(connect(mapStateToProps, { createReservation, loadTours, unmountMakeReservation })(MakeReservation));
