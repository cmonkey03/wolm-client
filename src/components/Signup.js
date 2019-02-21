import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { createUser } from '../actions/user';
import { unmountUser } from '../actions/user';
import {
  Checkbox,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      zipcode: '',
      bio: '',
      admin: false
    }
  }

  componentWillUnmount() {
    this.props.unmountUser()
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
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/android-chrome-192x192.png' /> Signup to book your tour
            </Header>
            <Segment raised>
              <Form
                onSubmit={this.handleSignupSubmit}
                size='large'
                key='large'
                loading={this.props.creatingUser}
                success={this.props.createSuccess}
                error={this.props.failedSignup}
              >
              { this.props.failedSignup ? this.handleErrors(this.props.error) : null }
              <Message success header="Welcome! Please login to make reservations."/>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder="Username"
                  name="username"
                  type='text'
                  maxLength='16'
                  value={this.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  maxLength='32'
                  value={this.password}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  name='passwordConfirm'
                  type='password'
                  maxLength='32'
                  value={this.password}
                  onChange={this.handleChange}
                  error={this.state.password !== this.state.passwordConfirm }
                />
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='email@host.com'
                  name='email'
                  type='email'
                  maxLength='32'
                  value={this.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='address card'
                  iconPosition='left'
                  placeholder='Zipcode'
                  name='zipcode'
                  type='text'
                  maxLength='5'
                  value={this.zipcode}
                  onChange={this.handleChange}
                />
              <Form.Input
                  fluid
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
            <Message>
              Already have an account? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ users: { creatingUser, createSuccess, failedSignup, error, loggedIn } }) => ({
  creatingUser,
  createSuccess,
  failedSignup,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { createUser, unmountUser })(Signup));
