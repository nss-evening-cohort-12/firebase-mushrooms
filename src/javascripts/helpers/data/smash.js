import mushroomData from './mushroomData';
import mycologistData from './mycologistData';
import mycologistMushroomData from './mycologistMushroomData';

const getSingleMycoWithShrooms = (mycologistId) => new Promise((resolve, reject) => {
  // 1. get the mycologist who's id is mycologistId
  mycologistData.getMycologistById(mycologistId)
    .then((response) => {
      const mycologist = response.data;
      mycologist.id = mycologistId;
      mycologist.mushrooms = [];
      // 2. get all of their mycologistMushrooms using the mycologist.uid
      mycologistMushroomData.getMycoShroomsByMycoUid(mycologist.uid).then((mycoShrooms) => {
        // 3. get ALL of the mushrooms
        mushroomData.getMushrooms().then((allMushrooms) => {
          // 4. add the mycologists owned mushrooms to mycologist.mushrooms[]
          mycoShrooms.forEach((mycoShroom) => {
            const mushroom = allMushrooms.find((m) => m.id === mycoShroom.mushroomId);
            mycologist.mushrooms.push(mushroom);
          });
          /**
           * example retun:
           * {
           *   age: 10000,
           *   name: 'Luke',
           *   uid: 'f789y2qh3uhf79234f7h234',
           *   id: 'mycologist1',
           *   mushrooms: [
           *     { id: 'mushroom1', name: 'shitake', location: 'forest', size: 's', weight: 10  },
           *     { id: 'mushroom2', name: 'portebello', location: 'forest', size: 'xl', weight: 10000  },
           *   ],
           * }
           */
          resolve(mycologist);
        });
      });
    })
    .catch((err) => reject(err));
});

const totallyRemoveShroomie = (mushroomId) => new Promise((resolve, reject) => {
  mushroomData.deleteMushroom(mushroomId)
    .then(() => {
      // get all mycoMushrooms with mushroomId
      mycologistMushroomData.getMycoShroomsByShroomId(mushroomId).then((mycoShrooms) => {
        mycoShrooms.forEach((mycologistMushroom) => {
          mycologistMushroomData.deleteMycoMushroom(mycologistMushroom.id);
        });
        resolve();
      });
      // delete each of tho mycoMushrooms
    })
    .catch((err) => reject(err));
});

export default { getSingleMycoWithShrooms, totallyRemoveShroomie };
