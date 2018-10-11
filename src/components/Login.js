import React from 'react';

const Login = (props) => {
  return (
    <form onSubmit={props.handleLoginSubmit}>
      <input  placeholder="Username"
              type="text"
              value={props.usernameInput}
              onChange={props.handleUsernameInput}
              />
      <input  placeholder="Password"
              type="text"
              value={props.passwordInput}
              onChange={props.handlePasswordInput}
              />
      <input  type='submit'
              value="Login"
              />
    </form>
  )
}

export default Login;
