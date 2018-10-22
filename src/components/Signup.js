import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Input, Segment, TextArea } from 'semantic-ui-react';
import { postUser }from '../actions/user';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      zipcode: '',
      bio: '',
      admin: false
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleAdminChange = (e) => this.setState({admin: !this.state.admin})

  handleSignupSubmit = (e) => {
    const userObj = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      zipcode: this.state.zipcode,
      bio: this.state.bio,
      admin: this.state.admin
    }

    this.props.postUser(userObj)
    this.setState({
        username: '',
        password: '',
        email: '',
        zipcode: '',
        bio: '',
        admin: false
    })
  }

  render () {
    return (
      <Segment>
        <Form onSubmit={this.handleSignupSubmit} error>
          <Form.Field
            control={Input}
            label='Username'
            placeholder="Username"
            name="username"
            type='text'
            maxLength='16'
            value={this.username}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            maxLength='32'
            value={this.password}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label='Email'
            placeholder='email@host.com'
            name='email'
            type='email'
            maxLength='32'
            value={this.email}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label='Zipcode'
            placeholder='Zipcode'
            name='zipcode'
            type='text'
            maxLength='5'
            value={this.zipcode}
            onChange={this.handleChange}
          />
          <Form.Field
            control={TextArea}
            label='Bio'
            placeholder='Bio'
            name='bio'
            type='text'
            maxLength='200'
            value={this.bio}
            onChange={this.handleChange}
          />
          <Form.Field>
            { this.state.admin ?
              <Checkbox toggle checked label='Administrator' onChange={this.handleAdminChange}/>
              :
              <Checkbox toggle label='Administrator' onChange={this.handleAdminChange}/>
            }
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          {/*{ props.errors && <Message
              error
              header='Action Forbidden'
              content={props.errors.join("; ")}
              />
          }*/}
          <Button type='submit'>Signup</Button>
        </Form>
      </Segment>
    )
  }
}

export default connect(null, { postUser })(Signup);
