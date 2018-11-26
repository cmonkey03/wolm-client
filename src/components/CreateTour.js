import React from 'react';
import {connect} from 'react-redux';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import moment from 'moment';
import {createTour} from '../actions/tour';
import {unmountTour} from '../actions/tour';
import { Button, Form, Grid, Input, Label, Message, Segment } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateTour extends React.Component {
  constructor(props) {
    super(props)
    this.ApiAdapter = new ApiAdapter()
    this.state = {
      startTime: moment(),
      endTime: moment(),
      price: 0
    }
  }

  componentWillUnmount() {
    this.props.unmountTour()
  }

  handleStartTimeChange = (date) => this.setState({startTime: date, endTime: date})
  handleEndTimeChange = (date) => this.setState({endTime: date})
  handlePriceChange = (event) => this.setState({price: event.target.value})

  handleTourSubmit = (e) => {
    const tourObj = {
      start_time: this.state.startTime,
      end_time: this.state.endTime,
      price: this.state.price
    }

    this.props.createTour(tourObj)
    this.setState({
      startTime: moment(),
      endTime: moment(),
      price: 0,
      error: null
    })

  }

  handleErrors = (errors) => {
    return errors.map((errorMessage, idx) => {
      return <Message error key={idx} header={errorMessage} />
    })
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <Form
              onSubmit={this.handleTourSubmit}
              size='small'
              key='small'
              loading={this.props.creatingTour}
              error={this.props.failedCreateTour}
              success={this.props.tourSuccess}
            >
              <Message success header="You have successfully created a tour."/>
              { this.props.failedCreateTour ? this.handleErrors(this.props.error) : null }
              <Form.Input label="Start Time">
                <DatePicker selected={this.state.startTime}
                            showTimeSelect
                            minDate={moment()}
                            dateFormat="LLL"
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            onChange={this.handleStartTimeChange}
                            />
                        </Form.Input>
              <Form.Input label="End Time">
                <DatePicker selected={this.state.endTime}
                            showTimeSelect
                            minDate={this.state.endTime}
                            dateFormat="LLL"
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            onChange={this.handleEndTimeChange}
                            />
                        </Form.Input>
              <Form.Input label='Price'>
                <Input labelPosition='right' type='text' placeholder='Amount'>
                  <Label basic>$</Label>
                  <input  type='number'
                          min='0'
                          max='200'
                          value={this.state.price}
                          onChange={this.handlePriceChange}
                          />
                  <Label>.00</Label>
                </Input>
              </Form.Input>
              <Button type='submit'>Create Tour</Button>
            </Form>
        </Segment>
      </Grid.Column>
    </Grid>
    )
  }
}

const mapStateToProps = ({tours: { creatingTour, tourSuccess, error, failedCreateTour }}) => ({
    creatingTour,
    tourSuccess,
    failedCreateTour,
    error
  })

export default withAuth(connect(mapStateToProps, {createTour, unmountTour})(CreateTour));
