import auth from './components/auth/auth';

import '../styles/main.scss';

/**
 * Be able to 'log in' to our app
 * Be able to 'log out' of our app
 * See a login button if we're NOT logged in
 * See a logout button if we ARE logged in
 * See a list of mushrooms (like a forest!) if we ARE logged in
 */

const init = () => {
  auth.loginButton();
};

init();
