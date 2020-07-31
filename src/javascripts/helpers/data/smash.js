import mushroomData from './mushroomData';
import mycologistData from './mycologistData';
import mycologistMushroomData from './mycologistMushroomData';

const getSingleMycoWithShrooms = (mycologistId) => new Promise((resolve, reject) => {
  // 1. get the mycologist who's id is mycologistId
  mycologistData
    .getMycologistById(mycologistId)
    .then((response) => {
      const mycologist = response.data;
      mycologist.id = mycologistId;
      mycologist.mushrooms = [];
      // 2. get all of their mycologistMushrooms using the mycologist.uid

      // PROMISE.ALL TIME //

      // Promose.all() takes and array of promises, and runs the 'then' only after ALL of them are fulfilled

      // a. Create an array of promises (remember that each of these functions returns a Promise)
      const allMyPromises = [
        mycologistMushroomData.getMycoShroomsByMycoUid(mycologist.uid),
        mushroomData.getMushrooms(),
      ];

      // b. Pass that array of promises to Promise.all and chain .then() off of it
      Promise.all(allMyPromises)
        // c. you know what, let's use array destructuring assignment!!!
        // this is equivilent to:
        //    const [mycoShrooms, allMushrooms] = fulfilledPromises;
        //    or const mycoShrooms = fulfilledPromises[0];
        //       const allMushrooms = fulfilledPromises[1];
        .then(([mycoShrooms, allMushrooms]) => {
          // f. This logic is exactly the same
          mycoShrooms.forEach((mycoShroom) => {
            const mushroom = allMushrooms.find((m) => m.id === mycoShroom.mushroomId);
            mycologist.mushrooms.push(mushroom);
          });

          resolve(mycologist);
        });
    })
    .catch((err) => reject(err));
});

const totallyRemoveShroomie = (mushroomId) => new Promise((resolve, reject) => {
  mushroomData
    .deleteMushroom(mushroomId)
    .then(() => {
      // get all mycoMushrooms with mushroomId
      mycologistMushroomData
        .getMycoShroomsByShroomId(mushroomId)
        .then((mycoShrooms) => {
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
  mushroomData
    .getMushrooms()
    .then((allMushrooms) => {
      mycologistData.getMycologists().then((allMycos) => {
        mycologistMushroomData
          .getAllMycoShrooms()
          .then((allMycoMushrooms) => {
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
                myco.mycologistMushroomId = isOwner
                  ? isOwner.id
                  : `no-${mushroom.id}-${myco.id}`;
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

export default {
  getSingleMycoWithShrooms,
  totallyRemoveShroomie,
  getMushroomsWithOwners,
};
