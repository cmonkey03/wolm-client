
![zombie-road](https://user-images.githubusercontent.com/39240428/47937694-26672a00-dea7-11e8-9eb2-2d9c9a715d35.png)

# Website of Lower Manhattan
This is the application for WOLM, a booking website where users can view tours, signup and make a reservation and request to be an administrator to view data and create tours.

## Tech used
- React
- Redux
- Thunk
- React-Router
- MomentJS
- OAuth
- Semantic UI React
- React-Spring

## Features
- Adapter pattern accesses  WOLM API through RESTful conventions
- Site authentication enables three-tier access: public, user and admin
- Four validated forms and six tables enable CRUD actions for three models: tours, users and admin
- Error and success messages are displayed after post, delete and update actions
- Optimistic rendering of updates to reduce API calls

## Setup
1. If you'd like to fetch from the heroku API, go to `/src/adapter.js` and ensure line 2 is commented and line 4 is uncommented
2. If you'd like to fetch from a the localhost, clone down the [WOLM server](https://github.com/cmonkey03/wolm-server) and followed the setup instructions there.
3. Clone down this repo and run `npm install http-server`.
4. Run `http-server -p 8000` from the command line and open [http://localhost:8000/](http://localhost:8000/) in your browser.

## Contribute
Thanks for your interest in contributing to WOLM!

The following is a set of guidelines for contributing to the WOLM client.

### Getting started
Review the documentation for P5 [here](https://p5js.org/reference/).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Issues
Before submitting a new issue ensure that one has not already been created by reviewing the [open issues](https://github.com/cmonkey03/ZombieRoad/issues). If your bug is unique to the currently open issues, submit a new one [here](https://github.com/cmonkey03/ZombieRoad/issues/new).

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


Ideas

1. Have one square that passes from right to left
  a.) squares = images
2. Avoid the squares instead of colliding into them
  a.) Have the score set to a certain number
  b.) Score decreases when player collides into squares
  c.) Keep the cursor in the frame to avoid cheating
  d.) Score would equal the number you have left when the timer is up
3. As soon as the player touches a single square, the game is over
  a.) Score = time
4. Levels
  a.) Speed could increase with time
  b.) Speed could increase with score
  c.) Levels = independent of score reporting

5. Make squares and sprite into avatars
