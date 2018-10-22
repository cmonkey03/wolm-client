import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Input, Segment, TextArea } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import ApiAdapter from '../adapter';

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
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      zipcode: this.state.zipcode,
      bio: this.state.bio,
      admin: this.props.admin
    }

    // this.ApiAdapter.updateUser(userObj).then(r=>{
    //   if (r.errors) {
    //     this.setState({errors: r.errors})
    //   } else {
    //     this.setState({
    //       username: '',
    //       password: '',
    //       zipcode: '',
    //       bio: '',
    //
    //     })
    //   }
    // })
  }

  render() {
    return (
      <Segment>
        <Form
          size='small'
          key='small'
          loading={this.props.updatingUser}
          error={this.props.failedLogin}
        >
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
            nam='bio'
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
          {/*{ this.state.errors && <Message
              error
              header='Action Forbidden'
              content={this.state.errors.join("; ")}
              />
          }*/}
          <Button type='submit'>Submit Edits</Button>
        </Form>
      </Segment>)
    }
}

const mapStateToProps = ({ users: { user: { username, password, email, zipcode, bio, admin }},
updatingUser, failedUpdate, error, loggedIn}) => ({
  username,
  password,
  email,
  zipcode,
  bio,
  admin,
  updatingUser,
  failedUpdate,
  error,
  loggedIn
})

export default withAuth(connect(mapStateToProps)(EditProfile))
