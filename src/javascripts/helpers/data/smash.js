import axios from 'axios';
import mushroomData from './mushroomData';
import mycologistData from './mycologistData';
import mmd from './mycologistMushroomData';

const getSingleMycoWithMushies = (mycoId) => new Promise((resolve, reject) => {
  mycologistData.getMycologistById(mycoId).then((response) => {
    const mycologist = response.data;
    mycologist.mushrooms = [];
    axios.all([mushroomData.getMushrooms(), mmd.getMycologistMushroomsByMycologistUid(mycologist.uid)])
      .then(axios.spread((mush, mycoMushie) => {
        mycoMushie.forEach((mm) => {
          const mushroom = mush.find((m) => m.id === mm.mushroomId);
          mycologist.mushrooms.push(mushroom);
        });
        resolve(mycologist);
      }));
  })
    .catch((err) => reject(err));
});

export default { getSingleMycoWithMushies };
