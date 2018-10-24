import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Form, Input, Message, Segment, TextArea } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';
import { updateUser }from '../actions/user';

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
      <Segment>
        <Form
          onSubmit={this.handleEditSubmit}
          size='small'
          key='small'
          loading={this.props.updatingUser}
          error={this.props.failedUpdate}
        >
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
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
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
      </Segment>)
    }
}

const mapStateToProps = ({ users: { user: { id, username, password, email, zipcode, bio, admin },
updatingUser, failedUpdate, error}}) => ({
  id,
  username,
  password,
  email,
  zipcode,
  bio,
  admin,
  updatingUser,
  failedUpdate,
  error,
})

export default withAuth(connect(mapStateToProps, { updateUser })(EditProfile))
