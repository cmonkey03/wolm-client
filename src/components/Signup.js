import React from 'react';

const Signup = (props) => {
  return (
    <form>
      <input  placeholder="Username"
              type="text"
              />
      <input  placeholder="Password"
              type="text"
              />
      <input  type='submit'
              value="Signup"
              />
    </form>
  )
}

export default Signup;
