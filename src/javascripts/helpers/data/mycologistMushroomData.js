import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMycoShroomsByMycoUid = (mycoUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologistMushrooms.json?orderBy="mycologistUid"&equalTo="${mycoUid}"`)
    .then((response) => {
      const mycoShroomsObj = response.data;
      const mycologistMushrooms = [];
      Object.keys(mycoShroomsObj).forEach((mycoShroomId) => {
        mycoShroomsObj[mycoShroomId].id = mycoShroomId;
        mycologistMushrooms.push(mycoShroomsObj[mycoShroomId]);
      });

      resolve(mycologistMushrooms);
    })
    .catch((err) => reject(err));
});

const getMycoShroomsByShroomId = (shroomId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologistMushrooms.json?orderBy="mushroomId"&equalTo="${shroomId}"`)
    .then((response) => {
      const mycoShroomsObj = response.data;
      const mycologistMushrooms = [];
      Object.keys(mycoShroomsObj).forEach((mycoShroomId) => {
        mycoShroomsObj[mycoShroomId].id = mycoShroomId;
        mycologistMushrooms.push(mycoShroomsObj[mycoShroomId]);
      });

      resolve(mycologistMushrooms);
    })
    .catch((err) => reject(err));
});

const deleteMycoMushroom = (mycoMushroomId) => axios.delete(`${baseUrl}/mycologistMushrooms/${mycoMushroomId}.json`);

export default { getMycoShroomsByMycoUid, getMycoShroomsByShroomId, deleteMycoMushroom };
