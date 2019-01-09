import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import { updateUser }from '../actions/user';
import { unmountUser } from '../actions/user';
import {
  Checkbox,
  Form,
  Grid,
  Header,
  Image,
  Input,
  Message,
  Segment,
  TextArea
} from 'semantic-ui-react';

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username,
      password: '',
      email: this.props.email,
      zipcode: this.props.zipcode,
      bio: this.props.bio,
      admin: this.props.admin
    }
    this.ApiAdapter = new ApiAdapter()
  }

  componentWillUnmount() {
    this.props.unmountUser()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleAdminChange = (e) => this.setState({admin: !this.state.admin})

  handleEditSubmit = (e) => {
    const userObj = {
      id: this.props.id,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      zipcode: this.state.zipcode,
      bio: this.state.bio,
      admin: this.props.admin
    }

    this.props.updateUser(userObj)
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
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/favicon-32x32.png' />Edit Your Profile
            </Header>
            <Segment raised>
              <Form
                onSubmit={this.handleEditSubmit}
                size='large'
                key='large'
                loading={this.props.updatingUser}
                error={this.props.failedUpdate}
                success={this.props.updateSuccess}
              >
              <Message success header="You have successfully updated your account."/>
              { this.props.failedUpdate ? this.handleErrors(this.props.error) : null }
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
                  name='password'
                  type='password'
                  maxLength='32'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='address card'
                  iconPosition='left'
                  placeholder='Zipcode'
                  control={Input}
                  name='zipcode'
                  type='text'
                  maxLength='5'
                  value={this.state.zipcode}
                  onChange={this.handleChange}
                />
              <Form.Input
                  placeholder='Bio'
                  name='bio'
                  type='text'
                  maxLength='200'
                  value={this.state.bio}
                  onChange={this.handleChange}
                />
                <Form.Field>
                  { this.state.admin ?
                    <Checkbox toggle checked label='Administrator' onChange={this.handleAdminChange}/>
                    :
                    <Checkbox toggle label='Administrator' onChange={this.handleAdminChange}/>
                  }
                </Form.Field>
                <Form.Button
                  type='submit'
                  disabled={!this.state.username
                    || !this.state.email
                    || !this.state.zipcode
                    || !this.state.bio
                  }
                  >Submit Edits</Form.Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ users: { user: { id, username, password, email, zipcode, bio, admin },
updatingUser, updateSuccess, failedUpdate, error}}) => ({
  id,
  username,
  password,
  email,
  zipcode,
  bio,
  admin,
  updatingUser,
  updateSuccess,
  failedUpdate,
  error,
})

export default withAuth(connect(mapStateToProps, { updateUser, unmountUser })(EditProfile))
