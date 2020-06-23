import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMycologists = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mycologists.json`)
    .then((response) => {
      const mycoObjects = response.data;
      const mycologists = [];
      Object.keys(mycoObjects).forEach((mycologistId) => {
        mycoObjects[mycologistId].id = mycologistId;
        mycologists.push(mycoObjects[mycologistId]);
      });
      resolve(mycologists);
    })
    .catch((err) => reject(err));
});

const getMycologistById = (mycologistId) => axios.get(`${baseUrl}/mycologists/${mycologistId}.json`);

export default { getMycologists, getMycologistById };
