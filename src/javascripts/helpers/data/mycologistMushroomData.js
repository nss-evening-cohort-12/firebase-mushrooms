import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMycoShroomsByMycoUid = (mycoUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologistMushrooms.json?orderBy="mycologistUid"&equalTo="${mycoUid}"`)
    .then(({ data }) => {
      const mycologistMushrooms = utils.convertFirebaseCollection(data);

      resolve(mycologistMushrooms);
    })
    .catch((err) => reject(err));
});

const getMycoShroomsByShroomId = (shroomId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologistMushrooms.json?orderBy="mushroomId"&equalTo="${shroomId}"`)
    .then(({ data }) => {
      const mycologistMushrooms = utils.convertFirebaseCollection(data);

      resolve(mycologistMushrooms);
    })
    .catch((err) => reject(err));
});

const deleteMycoMushroom = (mycoMushroomId) => axios.delete(`${baseUrl}/mycologistMushrooms/${mycoMushroomId}.json`);

export default { getMycoShroomsByMycoUid, getMycoShroomsByShroomId, deleteMycoMushroom };
