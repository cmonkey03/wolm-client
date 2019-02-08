import React from 'react';
import {connect} from 'react-redux';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import moment from 'moment';
import {createTour} from '../actions/tour';
import {loadTours} from '../actions/tour';
import {unmountTour} from '../actions/tour';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Button,
  Form,
  Grid,
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
      description: '',
      price: 0
    }
  }

  componentWillUnmount() {
    this.props.unmountTour()
  }

  handleStartTimeChange = (date) => this.setState({startTime: date, endTime: date})
  handleEndTimeChange = (date) => this.setState({endTime: date})
  handlePriceChange = (event) => this.setState({price: event.target.value})
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleTourSubmit = (e) => {
    const tourObj = {
      start_time: this.state.startTime,
      end_time: this.state.endTime,
      price: this.state.price,
      description: this.state.description
    }

    this.props.createTour(tourObj)
    this.setState({
      startTime: moment(),
      endTime: moment(),
      price: 0,
      error: null,
      description: ''
    })
    setTimeout(() => (this.props.loadTours()), 5000)
  }

  handleErrors = (errors) => {
    return errors.map((errorMessage, idx) => {
      return <Message error key={idx} header={errorMessage} />
    })
  }

  render() {
    return (
      <div className='signup-form'>
        {/*
          Heads up! The styles below are necessary for the correct render.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h3' attached='top' inverted color='grey'>Create a Tour</Header>
            <Segment raised attached>
              <Form
                onSubmit={this.handleTourSubmit}
                size='large'
                key='large'
                loading={this.props.creatingTour}
                error={this.props.failedCreateTour}
                success={this.props.tourSuccess}
              >
                <Message success header="You have successfully created a tour."/>
                { this.props.failedCreateTour ? this.handleErrors(this.props.error) : null }
                {/*Form.Input causes sizing errors with React-DatePicker*/}
                <Label>Start Time</Label>
                <DatePicker
                  fluid
                  selected={this.state.startTime}
                  showTimeSelect
                  minDate={moment()}
                  dateFormat="LLL"
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  onChange={this.handleStartTimeChange}
                />
                <Label>End Time</Label>
                <DatePicker
                  fluid
                  selected={this.state.endTime}
                  showTimeSelect
                  minDate={this.state.endTime}
                  dateFormat="LLL"
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  onChange={this.handleEndTimeChange}
                />
              <Label>Description</Label>
                <Form.TextArea
                  name='description'
                  type='text'
                  maxLength='200'
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              <Label>Price</Label>
              <Form.Input fluid>
                <Input labelPosition='right'>
                  <Label basic>$</Label>
                  <input  type='number'
                          min='0'
                          max='200'
                          name="price"
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
      </div>
    )
  }
}

const mapStateToProps = ({tours: { creatingTour, tourSuccess, error, failedCreateTour }}) => ({
    creatingTour,
    tourSuccess,
    failedCreateTour,
    error
  })

export default withAuth(connect(mapStateToProps, {createTour, loadTours, unmountTour})(CreateTour));
