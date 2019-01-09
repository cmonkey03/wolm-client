import React, { Fragment } from 'react';
import {
  Header,
  Image
} from 'semantic-ui-react';

const src1 = '/not-found.jpg'

const NotFound = () => (
  <Fragment>
    <Header size="huge" inverted color="brown">
      Nothing to see here!
    </Header>
    <Image src={src1} />
  </Fragment>
)

export default NotFound;
