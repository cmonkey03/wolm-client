import PropTypes from 'prop-types';
import React, { Component } from 'react';
import HomepageHeading from './HomepageHeading';
import AppHeading from './AppHeading';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { logoutUser } from '../actions/user';
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react';

const colors = ['teal', 'olive', 'brown', 'yellow', 'blue']

class MobileNavigation extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })
  handleClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    const { location } = this.props
    const { activeItem } = this.state

    return (
      <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item
            as={Link}
            to="/tours"
            name="tours"
            active={activeItem==="tours"}
            color={colors[2]}
            onClick={this.handleClick}
          />
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
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 150, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                {!this.props.loggedIn &&
                  <Menu.Item position='right'>
                    <Button
                      as={Link}
                      to="/login"
                      active={activeItem==="login"}
                      color={colors[0]}
                      onClick={this.handleClick}
                      inverted
                    >
                      Log in
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      active={activeItem==="signup"}
                      color={colors[4]}
                      onClick={this.handleClick}
                      inverted
                      style={{ marginLeft: '0.5em' }}
                      >
                      Sign Up
                    </Button>
                  </Menu.Item>}
                {this.props.loggedIn &&
                  <Menu.Item position='right'>
                    <Button
                      as={Link}
                      to="/home"
                      color={colors[4]}
                      inverted
                      style={{ marginLeft: '0.5em' }}
                      onClick={this.props.logoutUser}
                    >
                      Logout {this.props.user.username}
                    </Button>
                  </Menu.Item>}
              </Menu>
            </Container>
            {location.pathname === '/home' ?
              <HomepageHeading mobile />
              :
              <AppHeading/>}
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileNavigation.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = ({ users: { user , loggedIn }}) => ({
  user,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { logoutUser })(MobileNavigation));
