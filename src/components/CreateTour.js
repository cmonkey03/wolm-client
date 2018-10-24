import React from 'react';
import {connect} from 'react-redux';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import moment from 'moment';
import {createTour} from '../actions/tour';
import { Button, Form, Input, Label, Message, Segment } from 'semantic-ui-react';
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
    return errors.map((errorMessage) => (<Message error header={errorMessage} />))
  }

  render() {
    console.log(this.props)
    return (
      <Segment>
        <h1>Create a Tour</h1>
        <Form
          onSubmit={this.handleTourSubmit}
          size='small'
          key='small'
          loading={this.props.creatingTour}
          error={this.props.failedCreateTour}
        >
        { this.props.failedCreateTour ? this.handleErrors(this.props.error) : null }
          <Form.Field>
            <Label>Start Time</Label>
            <DatePicker selected={this.state.startTime}
                        showTimeSelect
                        minDate={moment()}
                        dateFormat="LLL"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        onChange={this.handleStartTimeChange}
                        />
          </Form.Field>
          <Form.Field>
            <Label>End Time</Label>
            <DatePicker selected={this.state.endTime}
                        showTimeSelect
                        minDate={this.state.endTime}
                        dateFormat="LLL"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        onChange={this.handleEndTimeChange}
                        />
          </Form.Field>
          <Form.Field>
            <Label>Price</Label>
            <Input labelPosition='right' type='text' placeholder='Amount'>
              <Label basic>$</Label>
              <input  type='number'
                      min='0'
                      value={this.state.price}
                      onChange={this.handlePriceChange}
                      />
              <Label>.00</Label>
            </Input>
          </Form.Field>
          <Button type='submit'>Create Tour</Button>
        </Form>
    </Segment>
    )
  }
}

const mapStateToProps = ({tours: { creatingTour, error, failedCreateTour }}) => ({
    creatingTour,
    failedCreateTour,
    error
  })

export default withAuth(connect(mapStateToProps, {createTour})(CreateTour));
