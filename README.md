
# Website of Lower Manhattan
This is the single-page application for WOLM, a booking website where users can view tours, signup and make a reservation and request to be an administrator to view data and create tours.

## Tech used
- React
- Redux
- Thunk
- React-Router
- MomentJS
- OAuth
- Semantic UI React
- React-Datepicker

## Features
- Single-page app enabled by React-Router with site redirects and 404 page
- Adapter pattern accesses WOLM API through RESTful conventions
- Site authentication enables three-tier access: public, user and admin
- Four validated forms and six tables enable CRUD actions for three models: tours, users and admin
- Error and success messages are displayed after post, delete and update actions
- Optimistic rendering of updates to reduce API calls
- `componentDidUnmount` clears message displays

## Setup
1. If you'd like to fetch from the heroku-hosted WOLM API, go to `/src/adapter.js` and ensure line 2 is commented and line 4 is uncommented
2. If you'd like to fetch from a localhost WOLM API, clone down the [WOLM server](https://github.com/cmonkey03/wolm-server) and followed the setup instructions there.
3. Clone this repo and run `npm install`.
4. To fetch from a local WOLM API, go to `/src/adapter.js` and ensure line 4 is commented and line 2 is uncommented
5. Run `npm start`
6. To edit Semantic UI React custom theming, cd to `/src/semantic` and run `gulp build` and `gulp watch`

## Contribute
Thanks for your interest in contributing to WOLM!

The following is a set of guidelines for contributing to the WOLM client.

### Getting started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Issues
Before submitting a new issue ensure that one has not already been created by reviewing the [open issues](https://github.com/cmonkey03/wolmclient/issues). If your bug is unique to the currently open issues, submit a new one [here](https://github.com/cmonkey03/wolm-client/issues/new).

#### Write detailed information
Detailed information is very helpful to understand an issue.

For example:
- How to reproduce the issue, step-by-step.
- The expected behavior (or what is wrong).
- Screenshots displaying the buggy behavior.
- The operating system.

### Pull requests
Pull Requests are always welcome. Ensure the PR description clearly describes the problem and solution. It should include:
- The operating system on which you tested.
- The relevant issue number, if applicable.

## Ideas
- To add parallax scrolling tour feature that enables users to track their location and information about key sites
- To enable users to request to be hosts for the tour
- Change error message handling to light up individual field where error occurred
