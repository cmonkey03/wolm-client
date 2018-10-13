import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react'

const Login = (props) => {
  return (
    <Form onSubmit={props.handleLoginSubmit}>
      <Form.Field
          control={Input}
          label='Username'
          placeholder="Username"
          type="text"
          maxLength='16'
          value={props.usernameInput}
          onChange={props.handleUsernameInput}
      />
      <Form.Field>
        <label>Password
        <input  placeholder="Password"
                type="password"
                value={props.passwordInput}
                onChange={props.handlePasswordInput}
                maxLength='32'
                />
            </label>
      </Form.Field>
      <Button type='submit'>Login</Button>
    </Form>
  )
}

export default Login;
