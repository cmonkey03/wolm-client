import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { logoutUser } from '../actions/user';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'brown']

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { active: "Login" }
  }

  handleClick = (e, { name }) => this.setState({ active: name })

  render() {
    const {active} = this.state
    return(
        <Menu inverted>
          {!this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              to="/login"
              name="Login"
              active={active==="Login"}
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {!this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              to="/signup"
              name="Signup"
              active={active==="Signup"}
              color={colors[4]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              to="/reservations"
              name="Reservations"
              active={active==="Reservations"}
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              as={NavLink}
              to="/admin"
              name="Administrator"
              active={active==="Administrator"}
              color={colors[4]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              as={NavLink}
              to="/new-tour"
              name="Create Tour"
              active={active==="Create Tour"}
              color={colors[5]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              to="/edit-profile"
              name="Edit Profile"
              active={active==="Edit Profile"}
              color={colors[2]}
              onClick={this.handleClick}
            />}
          { this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              to="/login"
              onClick={this.props.logoutUser}
              name={`Logout ${this.props.user.username}`}
              />}
        </Menu>
      )
  }
}

const mapStateToProps = ({ users: { user , loggedIn }}) => ({
  user,
  loggedIn
})

export default connect(mapStateToProps, { logoutUser })(NavBar)
