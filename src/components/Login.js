import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Form, Message, Segment } from 'semantic-ui-react';
import { loginUser }from '../actions/user';
import { unmountUser }from '../actions/user';

class Login extends React.Component {
  state = { username: '', password: '' }

  componentWillUnmount() {
    this.props.unmountUser()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.username, this.state.password)
    this.setState({ username: '', password: '' })
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to='/reservations' />
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
          <Form.Button
            type='submit'
            disabled={!this.state.username || !this.state.password}
            >Login</Form.Button>
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

export default withRouter(connect(mapStateToProps, { loginUser, unmountUser })(Login));
