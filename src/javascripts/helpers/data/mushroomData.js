import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMushrooms = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mushrooms.json`).then((response) => {
    resolve(utils.fbCollToArray(response));
  }).catch((error) => reject(error));
});

export default { getMushrooms };
