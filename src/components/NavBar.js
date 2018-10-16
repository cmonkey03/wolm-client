import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal']

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: colors[0]
    }
  }

  handleClick = (e, { name }) => this.setState({ active: name })

  render() {
    return(
        <div>
          <Menu inverted>
            {this.props.loggedInUser && <Menu.Item as={NavLink} color={colors[2]} to="/edit-profile" name="Edit Profile" onClick={this.handleClick}/>}
            {this.props.loggedInUser && <Menu.Item as={NavLink} color={colors[3]} to="/reservations" name="Reservations" onClick={this.handleClick}/>}
            {this.props.loggedInUser && this.props.loggedInUser.administrator && <Menu.Item as={NavLink} color={colors[4]} to="/admin" name="Administrator" onClick={this.handleClick}/>}
            {this.props.loggedInUser && this.props.loggedInUser.administrator && <Menu.Item as={NavLink} color={colors[5]} to="/new-tour" name="Create Tour" onClick={this.handleClick}/>}
            {!this.props.loggedInUser ?
              <Menu.Item as={NavLink} color={colors[0]} to="/login" name="Login" onClick={this.handleClick}/>
              :
              <Menu.Item name={`Logout ${this.props.loggedInUser.username}`} onClick={this.props.handleLogout}/>
            }
            {!this.props.loggedInUser && <Menu.Item as={NavLink} color={colors[1]} to="/signup" name="Signup" onClick={this.handleClick}/>}
          </Menu>
        </div>
      )
  }
}
