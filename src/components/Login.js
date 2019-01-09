import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {NavLink} from 'react-router-dom';
import { loginUser }from '../actions/user';
import { unmountUser }from '../actions/user';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';

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
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Log-in to your account
            </Header>
            <Form
              size='large'
              onSubmit={this.handleLoginSubmit}
              key='small'
              loading={this.props.authenticatingUser}
              error={this.props.failedLogin}
              >
              <Segment stacked>
                <Message error header={this.props.failedLogin ? this.props.error : null} />
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name='username'
                  type='text'
                  maxLength='16'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  maxLength='32'
                />
                <Button
                  color='teal'
                  fluid size='large'
                  disabled={!this.state.username || !this.state.password}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <NavLink to="/signup">Sign Up</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
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
