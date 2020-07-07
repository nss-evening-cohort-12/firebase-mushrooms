import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMushrooms = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mushrooms.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const deleteMushroom = (mushroomId) => axios.delete(`${baseUrl}/mushrooms/${mushroomId}.json`);

const addMushroom = (newMushroomObj) => axios.post(`${baseUrl}/mushrooms.json`, newMushroomObj);

export default { getMushrooms, deleteMushroom, addMushroom };
