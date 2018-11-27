import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { logoutUser } from '../actions/user';

const colors = ['teal', 'olive', 'brown', 'yellow']

// Continue to explore utilizing the NavLink activeClassName prop
//in order to indicate an active color

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
    return(
        <Menu widths={this.handleMenuSize()} inverted stackable>
            <Menu.Item
              as={Link}
              to="/tours"
              name="tours"
              active={activeItem==="tours"}
              color={colors[2]}
              onClick={this.handleClick}
            />
          {!this.props.loggedIn &&
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={activeItem==="login"}
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {!this.props.loggedIn &&
            <Menu.Item
              as={Link}
              to="/signup"
              name="signup"
              active={activeItem==="signup"}
              color={colors[1]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              as={Link}
              to="/reservations"
              name="reservations"
              active={activeItem==="reservations"}
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              as={Link}
              to="/admin"
              name="administrator"
              active={activeItem==="administrator"}
              color={colors[1]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              as={Link}
              to="/new-tour"
              name="create tour"
              active={activeItem==="create tour"}
              color={colors[2]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              as={Link}
              to="/edit-profile"
              name="edit profile"
              active={activeItem==="edit profile"}
              color={colors[3]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              as={Link}
              to="/login"
              color={colors[3]}
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
