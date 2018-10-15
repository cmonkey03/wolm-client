import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal']

export default class NavBar extends Component {
  state = { active: colors[0] }

  handleClick = (e, { name }) => this.setState({ active: name })

  render() {
    return(
        <div>
          <Menu inverted>
            <Menu.Item as={NavLink} color={colors[0]} to="/login" name="Login" onClick={this.handleClick}/>
            <Menu.Item as={NavLink} color={colors[1]} to="/signup" name="Signup" onClick={this.handleClick}/>
            <Menu.Item as={NavLink} color={colors[2]} to="/edit-profile" name="Edit Profile" onClick={this.handleClick}/>
            <Menu.Item as={NavLink} color={colors[3]} to="/reservations" name="Reservations" onClick={this.handleClick}/>
            <Menu.Item as={NavLink} color={colors[4]} to="/admin" name="Administrator" onClick={this.handleClick}/>
            <Menu.Item as={NavLink} color={colors[5]} to="/new-tour" name="Create Tour" onClick={this.handleClick}/>
          </Menu>
        </div>
      )
  }
}
