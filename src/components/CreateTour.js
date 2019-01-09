import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import moment from 'moment';
import {createTour} from '../actions/tour';
import {unmountTour} from '../actions/tour';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Button,
  Form,
  Header,
  Input,
  Label,
  Message,
  Segment
} from 'semantic-ui-react';

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
      <Fragment>
        <Header as='h2'textAlign='center'>Create a Tour</Header>
        <Segment raised>
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
            {/*Form.Input causes sizing errors with React-DatePicker*/}
            <Label>Start Time</Label>
            <DatePicker selected={this.state.startTime}
                        showTimeSelect
                        minDate={moment()}
                        dateFormat="LLL"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        onChange={this.handleStartTimeChange}
                        />
            <Label>End Time</Label>
            <DatePicker selected={this.state.endTime}
                        showTimeSelect
                        minDate={this.state.endTime}
                        dateFormat="LLL"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        onChange={this.handleEndTimeChange}
                        />
            <Label>Price</Label>
            <Form.Input fluid>
              <Input labelPosition='right'>
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
    </Fragment>
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
