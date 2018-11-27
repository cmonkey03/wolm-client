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
    console.log(this.state, this.props)
    return(
        <Menu widths={this.handleMenuSize()} inverted stackable>
            <Menu.Item
              header
              as={Link}
              to="/tours"
              exact
              name="tours"
              active={activeItem==="tours"}
              color={colors[2]}
              onClick={this.handleClick}
            />
          {!this.props.loggedIn &&
            <Menu.Item
              header
              as={Link}
              to="/login"
              exact
              name="login"
              active={activeItem==="login"}
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {!this.props.loggedIn &&
            <Menu.Item
              header
              as={Link}
              to="/signup"
              exact
              name="signup"
              active={activeItem==="signup"}
              color={colors[1]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              header
              as={Link}
              to="/reservations"
              exact
              name="reservations"
              active={activeItem==="reservations"}
              color={colors[0]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              header
              as={Link}
              to="/admin"
              exact
              name="administrator"
              active={activeItem==="administrator"}
              color={colors[1]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn && this.props.user.admin &&
            <Menu.Item
              header
              as={Link}
              to="/new-tour"
              exact
              name="create tour"
              active={activeItem==="create tour"}
              color={colors[2]}
              onClick={this.handleClick}
            />}
          {this.props.loggedIn &&
            <Menu.Item
              header
              as={Link}
              to="/edit-profile"
              exact
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
