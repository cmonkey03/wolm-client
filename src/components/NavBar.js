import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'brown']

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: "Login"
    }
  }

  handleClick = (e, { name }) => this.setState({ active: name })

  render() {
    return(
        <div>
          <Menu inverted>
            {!this.props.loggedInUser &&
              <Menu.Item
                as={NavLink}
                to="/login"
                onClick={this.handleClick}
                name="Login"
                color={colors[0]}
                />
            }
            {!this.props.loggedInUser &&
              <Menu.Item
                as={NavLink}
                to="/signup"
                onClick={this.handleClick}
                name="Signup"
                color={colors[1]}
              />}
            {this.props.loggedInUser &&
              <Menu.Item
                as={NavLink}
                to="/reservations"
                onClick={this.handleClick}
                name="Reservations"
                color={colors[3]}
              />}
            {this.props.loggedInUser && this.props.loggedInUser.administrator &&
              <Menu.Item
                as={NavLink}
                to="/admin"
                onClick={this.handleClick}
                name="Administrator"
                color={colors[4]}
              />}
            {this.props.loggedInUser && this.props.loggedInUser.administrator &&
              <Menu.Item
                as={NavLink}
                to="/new-tour"
                onClick={this.handleClick}
                name="Create Tour"
                color={colors[5]}
              />}
            {this.props.loggedInUser &&
              <Menu.Item
                as={NavLink}
                to="/edit-profile"
                onClick={this.handleClick}
                name="Edit Profile"
                color={colors[2]}
              />}
              { this.props.loggedInUser &&
                <Menu.Item
                  as={NavLink}
                  to="/login"
                  onClick={this.props.handleLogout}
                  name={`Logout ${this.props.loggedInUser.username}`}
                  />
              }
          </Menu>
        </div>
      )
  }
}
