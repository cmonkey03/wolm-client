import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {
  Container,
  Header
} from 'semantic-ui-react';

const AppHeading = ({ mobile }) => (
  <Container text>
    <NavLink to='/home'>
    <Header
      as='h1'
      content='WOLM'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        color: '#eae0ce',
      }}
    />
  </NavLink>
  </Container>
)

AppHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default AppHeading;
