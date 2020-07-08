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

/**
 *  [
 *    {
 *      id: "mushroom1",
 *      name: "Maitake",
 *      size: "s",
 *      location: "woods",
 *      weight: 34,
 *      mycologists: [
 *        {
 *          id: "mycologist1",
 *          name: "Luke",
 *          age: "100000",
 *          uid: "2UJIer9yb6br9oHpRmlYMlRs6Ss1",
 *          isChecked: false,
 *          mycologistMushroomId: "mycologistMushroom1" || "no-mushroomId-mycologistId",
 *        },
 *      ],
 *    }
 *  ]
 */

/**
 * 1. Get all mushrooms √
 * 2. Get all mycos √
 * 3. Get all mycoShrooms √
 * 4. Make the data structure
 * 5.
 * 6. resolve() the data that we've made!
 * 7. reject() any err
 */

const getMushroomsWithOwners = () => new Promise((resolve, reject) => {
  mushroomData.getMushrooms()
    .then((allMushrooms) => {
      mycologistData.getMycologists().then((allMycos) => {
        mycologistMushroomData.getAllMycoShrooms().then((allMycoMushrooms) => {
          const finalMushrooms = [];
          // loop over each mushroom
          allMushrooms.forEach((oneMushroom) => {
            // add each mycologist to oneMushroom
            const mushroom = { mycologists: [], ...oneMushroom };
            // find all mycoMushrooms for the current mushroom
            const mycoMushroomOwners = allMycoMushrooms.filter((mms) => mms.mushroomId === mushroom.id);
            allMycos.forEach((oneMyco) => {
              const myco = { ...oneMyco };
              // add oneMyco.isChecked if oneMyco owns this mushroom
              const isOwner = mycoMushroomOwners.find((mms) => mms.mycologistUid === myco.uid);

              myco.isChecked = isOwner !== undefined;
              myco.mycologistMushroomId = isOwner ? isOwner.id : `no-${mushroom.id}-${myco.id}`;
              // add mycologistMushroomId, faking id where needed
              mushroom.mycologists.push(myco);
            });

            finalMushrooms.push(mushroom);
          });

          resolve(finalMushrooms);
        });
      });
    })
    .catch((err) => reject(err));
});

export default { getSingleMycoWithShrooms, totallyRemoveShroomie, getMushroomsWithOwners };
