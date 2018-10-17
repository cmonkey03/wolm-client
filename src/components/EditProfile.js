import React from 'react';
import ApiAdapter from '../adapter';
import { Button, Checkbox, Form, Input, Message, TextArea } from 'semantic-ui-react';

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props)
    this.ApiAdapter = new ApiAdapter()
    this.state = {
      username: props.loggedInUser.username,
      password: props.loggedInUser.password,
      zipcode: props.loggedInUser.zipcode,
      bio: props.loggedInUser.bio,
      errors: null
    }
  }

  handleUsernameInput = e => this.setState({username:e.target.value})
  handlePasswordInput = e => this.setState({password:e.target.value})
  handleZipcodeInput = e => this.setState({zipcode:e.target.value})
  handleBioInput = e => this.setState({bio:e.target.value})

  handleEditSubmit = (e) => {
    const userObj = {
      id: this.props.loggedInUser.id,
      username: this.state.username,
      password: this.state.password,
      zipcode: this.state.zipcode,
      bio: this.state.bio
    }

    this.ApiAdapter.updateUser(userObj).then(r=>{
      if (r.errors) {
        this.setState({errors: r.errors})
      } else {
        this.setState({
          username: '',
          password: '',
          zipcode: '',
          bio: '',
          errors: null,
        })
      }
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleEditSubmit} error>
        <Form.Field
          control={Input}
          label='Username'
          placeholder="Username"
          type='text'
          maxLength='16'
          value={this.state.username}
          onChange={this.handleUsernameInput}
        />
        <Form.Field
          control={Input}
          label='Password'
          placeholder='Password'
          type='password'
          maxLength='32'
          value={this.state.password}
          onChange={this.handlePasswordInput}
        />
        <Form.Field
          control={Input}
          label='Zipcode'
          placeholder='Zipcode'
          type='text'
          maxLength='5'
          value={this.state.zipcode}
          onChange={this.handleZipcodeInput}
        />
        <Form.Field
          control={TextArea}
          label='Bio'
          placeholder='Bio'
          type='text'
          maxLength='200'
          value={this.state.bio}
          onChange={this.handleBioInput}
        />
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        { this.state.errors && <Message
            error
            header='Action Forbidden'
            content={this.state.errors.join("; ")}
            />
        }
        <Button type='submit'>Submit Edits</Button>
      </Form>)
    }
}
