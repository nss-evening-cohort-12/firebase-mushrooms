import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMycologists = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologists.json`)
    .then(({ data }) => {
      const mycologists = utils.convertFirebaseCollection(data);

      resolve(mycologists);
    })
    .catch((err) => reject(err));
});

const getMycologistById = (mycologistId) => axios.get(`${baseUrl}/mycologists/${mycologistId}.json`);

export default { getMycologists, getMycologistById };
