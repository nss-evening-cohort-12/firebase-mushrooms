import firebase from 'firebase/app';
import 'firebase/auth';

const checkLoginStatus = (showLoggedInView, showLoggedOutView) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showLoggedInView();
    } else {
      showLoggedOutView();
    }
  });
};

export default { checkLoginStatus };
