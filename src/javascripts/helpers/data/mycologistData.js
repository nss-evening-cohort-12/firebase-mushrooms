import axios from 'axios';
import apiKyes from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKyes.firebaseConfig.databaseURL;

const getMycologists = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologists.json`).then((response) => {
    const mycologists = utils.fbCollToArray(response);
    resolve(mycologists);
  }).catch((error) => reject(error));
});

const getMycologistById = (id) => axios.get(`${baseUrl}/mycologists/${id}.json`);

export default { getMycologists, getMycologistById };
