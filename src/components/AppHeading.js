import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Container,
  Header
} from 'semantic-ui-react';

const AppHeading = ({ mobile }) => (
  <Container text>
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
  </Container>
)

AppHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default AppHeading;
