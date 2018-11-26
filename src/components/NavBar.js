import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { logoutUser } from '../actions/user';

const colors = ['teal', 'olive', 'brown', 'yellow']

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleClick = (e, { name }) => this.setState({ activeItem: name })

  handleMenuSize = () => {
    if (this.props.loggedIn && this.props.user.admin) {
      return 6
    } else if (this.props.loggedIn) {
      return 3
    } else {
      return 3
    }
  }

  render() {
    const {activeItem} = this.state
    console.log(this.state)
    return(
        <Menu widths={this.handleMenuSize()} inverted stackable>
            <Menu.Item
              as={NavLink}
              exact
              to="/tours"
              name="tours"
              color={colors[2]}
              onClick={this.handleClick}
            />
          {!this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              exact
              to="/login"
              name="login"
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {!this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              exact
              to="/signup"
              name="signup"
              color={colors[1]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              exact
              to="/reservations"
              name="reservations"
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              as={NavLink}
              exact
              to="/admin"
              name="administrator"
              color={colors[1]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              as={NavLink}
              exact
              to="/new-tour"
              name="create Tour"
              color={colors[2]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              as={NavLink}
              exact
              to="/edit-profile"
              name="edit Profile"
              color={colors[3]}
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
