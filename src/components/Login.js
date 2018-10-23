import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';
import { loginUser }from '../actions/user';

class Login extends React.Component {
  state = { username: '', password: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.username, this.state.password)
    this.setState({ username: '', password: '' })
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to='/edit-profile' />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleLoginSubmit}
          size='small'
          key='small'
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message error header={this.props.failedLogin ? this.props.error : null} />
          <Form.Input
              label='Username'
              placeholder='Username'
              name='username'
              type='text'
              maxLength='16'
              value={this.state.username}
              onChange={this.handleChange}
          />
          <Form.Input
                label='Password'
                placeholder='Password'
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
                maxLength='32'
          />
          <Button type='submit'>Login</Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = ({ users: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
