import React from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import { Button, Form, Header, Icon, Menu, Message, Table } from 'semantic-ui-react';
import moment from 'moment';
import { createReservation } from '../actions/reservation';

class MakeReservation extends React.Component {

  handleSubmitReservation = (e) => {
    const reservationObj = {
      user_id: this.props.user.id,
      tour_id: parseInt(e.target.name)
    }

    this.props.createReservation(reservationObj)
  }

  tourRow = (tours) => {
    return (tours.map((tour) => {
      return (<Table.Row key={tour.id}>
            <Table.Cell textAlign='center'><Button size='small' onClick={this.handleSubmitReservation} name={tour.id}>Book This Tour</Button></Table.Cell>
            <Table.Cell>{moment(tour.start_time).format("LLLL")}</Table.Cell>
            <Table.Cell>{moment(tour.end_time).format("LLL")}</Table.Cell>
            <Table.Cell>{tour.price}</Table.Cell>
            <Table.Cell>{tour.reservations.length}</Table.Cell>
          </Table.Row>)
    }))
  }

  render() {
    return (
      <React.Fragment>
        <Header as='h2'>Make a Reservation</Header>
        {this.props.successResponse && this.props.successResponse.tour && <Message
          success
          header={this.props.successResponse.message}
          />}
        <Header as='h3' attached='top' inverted color='teal'>Tours</Header>
          <Form
            success={!!this.props.successMessage}
            loading={this.props.makingReservation}
          >
          <Message
            success
            header={this.props.successMessage ? this.props.successMessage : null}
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
                  <Menu floated='right' pagination>
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
                  </Menu>
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

export default withAuth(connect(mapStateToProps, { createReservation })(MakeReservation));
