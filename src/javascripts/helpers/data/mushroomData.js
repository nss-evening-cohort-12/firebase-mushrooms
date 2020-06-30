import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMushrooms = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mushrooms.json`)
    .then(({ data }) => {
      const mushrooms = utils.convertFirebaseCollection(data);

      resolve(mushrooms);
    })
    .catch((err) => reject(err));
});

const deleteMushroom = (mushroomId) => axios.delete(`${baseUrl}/mushrooms/${mushroomId}.json`);

export default { getMushrooms, deleteMushroom };
