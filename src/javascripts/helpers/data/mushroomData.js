import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMushrooms = () => axios.get(`${baseUrl}/mushrooms.json`);

export default { getMushrooms };
