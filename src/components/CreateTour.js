import React from 'react';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import moment from 'moment';
import { Button, Form, Input, Label, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateTour extends React.Component {
  constructor(props) {
    super(props)
    this.ApiAdapter = new ApiAdapter()
    this.state = {
      startTime: moment(),
      endTime: moment(),
      price: 0,
      errors: null
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

    this.ApiAdapter.postTour(tourObj).then(r=>{
      if (r.errors) {
        this.setState({errors: r.errors}, () => console.log(this.state))
      } else {
        this.setState({
          startTime: moment(),
          endTime: moment(),
          price: 0,
          errors: null
        })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Create a Tour</h1>
        <Form onSubmit={this.handleTourSubmit}>
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
        { this.state.errors && <Message
          error
          header='Action Forbidden'
          content={this.state.errors.join("; ")}
          />
      }
      </React.Fragment>
    )
  }
}

export default withAuth(CreateTour);
