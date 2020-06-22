import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMushrooms = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/mushrooms.json`)
    .then((response) => {
      const mushroomObjects = response.data;
      const mushrooms = [];
      Object.keys(mushroomObjects).forEach((mushroomId) => {
        // adding the id onto each object
        mushroomObjects[mushroomId].id = mushroomId;
        mushrooms.push(mushroomObjects[mushroomId]);
        // put the object onto the mushrooms array
      });
      // take the response
      // format it into an array of objects
      // resolve the new array of objects
      resolve(mushrooms);
    })
    .catch((err) => reject(err));
});

export default { getMushrooms };
