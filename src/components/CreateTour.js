import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default class CreateTour extends React.Component {
  state = {
    startTimeInput: "",
    endTimeInput: "",
    price: null
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <h1>Create a Tour</h1>
        <Form>
          <Form.Field
              control={Input}
              label='Username'
              placeholder="Username"
              type="datetime"
              maxLength='16'
              value={this.state.startTimeInput}
          />
          <Form.Field>
            <label>Password
            <input  placeholder="Password"
                    type="password"
                    value={this.state.endTimeInput}
                    maxLength='32'
                    />
                </label>
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
      </React.Fragment>
    )
  }
}
