import mushroomComponent from '../mushroom/mushroom';
import mushroomData from '../../helpers/data/mushroomData';
import utils from '../../helpers/utils';

const removeShroomEvent = (e) => {
  const mushroomId = e.target.closest('.card').id;
  console.warn(mushroomId);
  // actually delete this mushroom from firebase
  mushroomData.deleteMushroom(mushroomId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildForest();
    })
    .catch((err) => console.error('could not delete mushroom', err));
  // reprint the dom (so the lil shroomie goes away)
};

const buildForest = () => {
  mushroomData.getMushrooms()
    .then((mushrooms) => {
      let domString = `
        <h2 class="text-center">Forest</h2>
        <div class="d-flex flex-wrap">
      `;

      mushrooms.forEach((mushroom) => {
        domString += mushroomComponent.mushroomMaker(mushroom);
      });

      domString += '</div>';

      utils.printToDom('#forest', domString);
      $('body').on('click', '.delete-shroom', removeShroomEvent);
    })
    .catch((err) => console.error('get mushrooms broke :/', err));
};

export default { buildForest };
