import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'brown']

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ""
    }
  }

  handleClick = (e, { name }) => this.setState({ active: name })

  render() {
    return(
        <div>
          <Menu inverted>
            {!this.props.user.loggedIn &&
              <Menu.Item
                as={NavLink}
                to="/login"
                onClick={this.handleClick}
                name="Login"
                color={colors[0]}
                />
            }
            {!this.props.user.loggedIn &&
              <Menu.Item
                as={NavLink}
                to="/signup"
                onClick={this.handleClick}
                name="Signup"
                color={colors[1]}
              />}
            {this.props.user.loggedIn &&
              <Menu.Item
                as={NavLink}
                to="/reservations"
                onClick={this.handleClick}
                name="Reservations"
                color={colors[3]}
              />}
            {this.props.user.loggedIn && this.props.user.user.admin &&
              <Menu.Item
                as={NavLink}
                to="/admin"
                onClick={this.handleClick}
                name="Administrator"
                color={colors[4]}
              />}
            {this.props.user.loggedIn && this.props.user.user.admin &&
              <Menu.Item
                as={NavLink}
                to="/new-tour"
                onClick={this.handleClick}
                name="Create Tour"
                color={colors[5]}
              />}
            {this.props.user.loggedIn &&
              <Menu.Item
                as={NavLink}
                to="/edit-profile"
                onClick={this.handleClick}
                name="Edit Profile"
                color={colors[2]}
              />}
              { this.props.user.loggedIn &&
                <Menu.Item
                  as={NavLink}
                  to="/login"
                  onClick={this.props.handleLogout}
                  name={`Logout ${this.props.user.user.username}`}
                  />
              }
          </Menu>
        </div>
      )
  }
}

const mapStateToProps = ({ users: user }) => ({ user })

export default connect(mapStateToProps)(NavBar)
