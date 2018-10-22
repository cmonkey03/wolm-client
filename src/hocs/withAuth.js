import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { fetchCurrentUser } from '../actions/user'
import { Loader } from 'semantic-ui-react'

const withAuth = (WrappedComponent) => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentUser()
    }

    render() {
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <Loader active inline='centered' />
      } else {
        return <Redirect to='/login' />
      }
    }
  }
  const mapStateToProps = state => {
    return {
      loggedIn: state.users.loggedIn,
      authenticatingUser: state.users.authenticatingUser
    }
  }

  return connect(
    mapStateToProps,
    { fetchCurrentUser }
  )(AuthorizedComponent)

}


export default withAuth;
