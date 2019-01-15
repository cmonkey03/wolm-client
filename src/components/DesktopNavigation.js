import PropTypes from 'prop-types'
import React, { Component } from 'react'
import HomepageHeading from './HomepageHeading';
import AppHeading from './AppHeading';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { logoutUser } from '../actions/user';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
* such things.
*/

const colors = ['teal', 'olive', 'brown', 'yellow']

class DesktopNavigation extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  handleClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { children } = this.props
    const { fixed } = this.state
    const { location } = this.props
    const {activeItem} = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={
              location.pathname === '/home' ?
              { minHeight: 700, padding: '1em 0em' }
              :
              { minHeight: 200, maxHeight: 200, padding: '1em 0em' }
            }
            vertical
          >
          { location.pathname !== '/home' ?
            <AppHeading />
            :
            null
          }
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
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
                  position='right'
                >
                <Button
                  as={Link}
                  to="/login"
                  active={activeItem==="login"}
                  color={colors[0]}
                  onClick={this.handleClick}
                  inverted={!fixed}
                >
                  Log in
                </Button>
                <Button
                  as={Link}
                  to="/signup"
                  active={activeItem==="signup"}
                  color={colors[1]}
                  onClick={this.handleClick}
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Menu.Item>}
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
                    position='right'
                  >
                    <Button
                      as={Link}
                      to="/home"
                      color={colors[3]}
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: '0.5em' }}
                      onClick={this.props.logoutUser}
                    >
                      Logout {this.props.user.username}
                    </Button>
                  </Menu.Item>
                }
              </Container>
            </Menu>
            { location.pathname === '/home' ?
              <HomepageHeading />
              :
              null
            }
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}


DesktopNavigation.propTypes = {
  children: PropTypes.node
}

const mapStateToProps = ({ users: { user , loggedIn }}) => ({
  user,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { logoutUser })(DesktopNavigation));
