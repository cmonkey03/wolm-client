import React from 'react';
import AllUsers from './AllUsers.js';
import AllTours from './AllTours.js';
import AllReservations from './AllReservations.js';
import { Header, Icon } from 'semantic-ui-react';

const AdminPanel = (props) => {
  return(
    <React.Fragment>
      <Header as='h2' icon>
      <Icon name='settings'/>
      Administrator Panel
      <Header.Subheader>Manage tours, users and reservations.</Header.Subheader>
    </Header>
      <AllUsers />
      <AllTours />
      <AllReservations />
    </React.Fragment>
  )
}

export default AdminPanel;
