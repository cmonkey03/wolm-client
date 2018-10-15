import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Button, Form, Input, Label } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateTour extends React.Component {
  state = {
    startTime: moment(),
    endTime: moment(),
    price: 0
  }

  handleStartTimeChange = (date) => this.setState({startTime: date})
  handleEndTimeChange = (date) => this.setState({endTime: date})
  handlePriceChange = (event) => this.setState({price: event.target.value})

  render() {
    return (
      <React.Fragment>
        <h1>Create a Tour</h1>
        <Form>
          <Form.Field>
            <Label>Start Time</Label>
            <DatePicker selected={this.state.startTime}
                        showTimeSelect
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
      </React.Fragment>
    )
  }
}
