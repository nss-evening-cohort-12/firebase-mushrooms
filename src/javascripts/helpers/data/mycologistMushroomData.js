import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMycologistMushrooms = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologistMushrooms.json`).then((response) => {
    resolve(utils.fbCollToArray(response));
  }).catch((error) => reject(error));
});

const getMycologistMushroomsByMycologistUid = (mycologistUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologistMushrooms.json?orderBy="mycologistUid"&equalTo="${mycologistUid}"`).then((response) => {
    resolve(utils.fbCollToArray(response));
  }).catch((error) => reject(error));
});

export default {
  getMycologistMushrooms,
  getMycologistMushroomsByMycologistUid,
};
