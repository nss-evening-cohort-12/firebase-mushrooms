import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import mushroomList from './components/mushroomList/mushroomList';
import mycologistList from './components/mycologistList/mycologistList';
import myNavbar from './components/myNavbar/myNavbar';

import '../styles/main.scss';

const authDiv = $('#auth');
const forestDiv = $('#forest');
const hutDiv = $('#hut');
const logoutButton = $('#navbar-logout-button');
const singleMycoDiv = $('#single-myco');

const showLoggedInView = () => {
  authDiv.addClass('hide');
  forestDiv.removeClass('hide');
  hutDiv.removeClass('hide');
  singleMycoDiv.removeClass('hide');
  logoutButton.removeClass('hide');

  mushroomList.buildForest();
  mycologistList.buildHut();
};

const showLoggedOutView = () => {
  authDiv.removeClass('hide');
  forestDiv.addClass('hide');
  hutDiv.addClass('hide');
  singleMycoDiv.addClass('hide');
  logoutButton.addClass('hide');
};

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus(showLoggedInView, showLoggedOutView);
  auth.loginButton();
  myNavbar.logoutEvent();

  $('body').on('mouseenter', '.myco-card', (e) => {
    e.target.closest('.card').classList.add('bg-dark');
  });
  $('body').on('mouseleave', '.myco-card', (e) => {
    e.target.closest('.card').classList.remove('bg-dark');
  });
};

init();
