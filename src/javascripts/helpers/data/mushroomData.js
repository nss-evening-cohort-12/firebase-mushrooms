import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMushrooms = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mushrooms.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getMushroomById = (mushroomId) => axios.get(`${baseUrl}/mushrooms/${mushroomId}.json`);

const deleteMushroom = (mushroomId) => axios.delete(`${baseUrl}/mushrooms/${mushroomId}.json`);

const addMushroom = (newMushroomObj) => axios.post(`${baseUrl}/mushrooms.json`, newMushroomObj);

const updateMushroom = (mushroomId, editedMushroom) => axios.put(`${baseUrl}/mushrooms/${mushroomId}.json`, editedMushroom);

export default {
  getMushrooms,
  getMushroomById,
  deleteMushroom,
  addMushroom,
  updateMushroom,
};
