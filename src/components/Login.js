import React from 'react';

const Login = (props) => {
  return (
    <form>
      <input  placeholder="Username"
              type="text"
              />
      <input  placeholder="Password"
              type="text"
              />
      <input  type='submit'
              value="Login"
              />
    </form>
  )
}

export default Login;
