import React from 'react';
import AllUsers from './AllUsers.js';
import AllTours from './AllTours.js';
import AllReservations from './AllReservations.js';

const AdminPanel = (props) => {
  return(
    <React.Fragment>
      <h1>Hello from the admin page</h1>
      <AllUsers />
      <AllTours />
      <AllReservations />
    </React.Fragment>
  )
}

export default AdminPanel;
