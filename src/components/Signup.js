import React from 'react';
// import { Button, Checkbox, Form, Input, Message, TextArea } from 'semantic-ui-react';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    zipcode: '',
    bio: '',
    admin: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSignupSubmit = (e) => {
    const userObj = {
      username: this.state.usernameInput,
      password: this.state.passwordInput,
      zipcode: this.state.zipcodeInput,
      bio: this.state.bioInput,
      administrator: this.state.adminInput
    }

    this.ApiAdapter.postUser(userObj).then(r=>{
      if (r.errors) {
        this.setState({errors: r.errors})
      } else {
        this.setState({
            username: '',
            password: '',
            email: '',
            zipcode: '',
            bio: '',
            admin: false
        })
      }
    })
  }

  render () {
    return (
      {/*<Form onSubmit={this.handleSignupSubmit} error>
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
          { props.adminInput ?
            <Checkbox toggle checked label='Administrator' onChange={props.handleAdminChange}/>
            :
            <Checkbox toggle label='Administrator' onChange={props.handleAdminChange}/>
          }
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        { props.errors && <Message
            error
            header='Action Forbidden'
            content={props.errors.join("; ")}
            />
        }
        <Button type='submit'>Signup</Button>
      </Form>*/}
    )
  }
}

export default Signup;
