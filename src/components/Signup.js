import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Checkbox, Form, Message, Segment } from 'semantic-ui-react';
import { createUser } from '../actions/user';

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

    this.props.createUser(userObj)
    this.setState({
        username: '',
        password: '',
        email: '',
        zipcode: '',
        bio: '',
        admin: false
    })
  }

  handleErrors = (errors) => {
    return errors.map((errorMessage, idx) => {
      return <Message error key={idx} header={errorMessage} />
    })
  }

  render () {
    return this.props.loggedIn ? (
      <Redirect to='/reservations' />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleSignupSubmit}
          size='small'
          key='small'
          loading={this.props.creatingUser}
          error={this.props.failedSignup}
        >
        { this.props.failedSignup ? this.handleErrors(this.props.error) : null }
          <Form.Input
            label='Username'
            placeholder="Username"
            name="username"
            type='text'
            maxLength='16'
            value={this.username}
            onChange={this.handleChange}
          />
          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            maxLength='32'
            value={this.password}
            onChange={this.handleChange}
          />
          <Form.Input
            label='Email'
            placeholder='email@host.com'
            name='email'
            type='email'
            maxLength='32'
            value={this.email}
            onChange={this.handleChange}
          />
          <Form.Input
            label='Zipcode'
            placeholder='Zipcode'
            name='zipcode'
            type='text'
            maxLength='5'
            value={this.zipcode}
            onChange={this.handleChange}
          />
          <Form.TextArea
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
          <Form.Checkbox label='I agree to the Terms and Conditions' />
          <Form.Button
            type='submit'
            disabled={!this.state.username
              || !this.state.password
              || !this.state.email
              || !this.state.zipcode
              || !this.state.bio
            }
            >Signup</Form.Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = ({ users: { creatingUser, failedSignup, error, loggedIn } }) => ({
  creatingUser,
  failedSignup,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { createUser })(Signup));
