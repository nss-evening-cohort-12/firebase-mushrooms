import mushroomComponent from '../mushroom/mushroom';
import newMushroom from '../newMushroom/newMushroom';
import mushroomData from '../../helpers/data/mushroomData';
import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';

const removeShroomEvent = (e) => {
  const mushroomId = e.target.closest('.card').id;
  // actually delete this mushroom from firebase
  smash.totallyRemoveShroomie(mushroomId)
    .then(() => {
      // reprint the dom (so the lil shroomie goes away)
      // eslint-disable-next-line no-use-before-define
      buildForest();
      utils.printToDom('#single-myco', '');
    })
    .catch((err) => console.error('could not delete mushroom', err));
};

const addShroomEvent = (e) => {
  e.preventDefault();

  const newMush = {
    name: $('#mush-name').val(),
    size: $('#mush-size').val(),
    location: $('#mush-location').val(),
    weight: $('#mush-weight').val() * 1,
  };

  mushroomData.addMushroom(newMush)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildForest();
      utils.printToDom('#new-shroom', '');
    })
    .catch((err) => console.error('could not add mushroom', err));
};

const buildForest = () => {
  mushroomData.getMushrooms()
    .then((mushrooms) => {
      let domString = `
        <h2 class="text-center">Forest</h2>
        <button class="btn btn-success" id="show-add-mush"><i class="fas fa-ad"></i> New Shroom</button>
        <div class="d-flex flex-wrap">
      `;

      mushrooms.forEach((mushroom) => {
        domString += mushroomComponent.mushroomMaker(mushroom);
      });

      domString += '</div>';

      utils.printToDom('#forest', domString);
      $('body').on('click', '.delete-shroom', removeShroomEvent);
      $('body').on('click', '#mush-creator', addShroomEvent);
      $('body').on('click', '#show-add-mush', newMushroom.showForm);
    })
    .catch((err) => console.error('get mushrooms broke :/', err));
};

export default { buildForest };
