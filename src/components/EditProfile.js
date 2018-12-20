import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Form, Grid, Header, Input, Message, Segment, TextArea } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import { updateUser }from '../actions/user';
import { unmountUser } from '../actions/user';

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
      <Grid centered columns={2}>
        <Grid.Column>
        <Header as='h2'textAlign='center'>Edit Your Profile</Header>
        <Segment>
          <Form
            onSubmit={this.handleEditSubmit}
            size='small'
            key='small'
            loading={this.props.updatingUser}
            error={this.props.failedUpdate}
            success={this.props.updateSuccess}
          >
          <Message success header="You have successfully updated your account."/>
          { this.props.failedUpdate ? this.handleErrors(this.props.error) : null }
            <Form.Field
              control={Input}
              label='Username'
              placeholder='Username'
              name='username'
              type='text'
              maxLength='16'
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label='Password'
              placeholder='Password'
              name='password'
              type='password'
              maxLength='32'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label='Email'
              placeholder='Email'
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label='Zipcode'
              placeholder='Zipcode'
              name='zipcode'
              type='text'
              maxLength='5'
              value={this.state.zipcode}
              onChange={this.handleChange}
            />
            <Form.Field
              control={TextArea}
              label='Bio'
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
    </Grid>)
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
