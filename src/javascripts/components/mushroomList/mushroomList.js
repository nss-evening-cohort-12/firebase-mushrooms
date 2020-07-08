import editMushroom from '../editMushroom/editMushroom';
import mushroomComponent from '../mushroom/mushroom';
import newMushroom from '../newMushroom/newMushroom';

import mushroomData from '../../helpers/data/mushroomData';
import mycologistMushroomData from '../../helpers/data/mycologistMushroomData';
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

const editShroomEvent = (e) => {
  e.preventDefault();

  // get the id of the mushroom (for updating purposes)
  const mushroomid = e.target.closest('.edit-mushroom').id;
  // create the 'modified' mushroom
  const editedMush = {
    name: $('#edit-mush-name').val(),
    size: $('#edit-mush-size').val(),
    location: $('#edit-mush-location').val(),
    weight: $('#edit-mush-weight').val() * 1,
  };
  // pass those to an update mushroom data function
  mushroomData.updateMushroom(mushroomid, editedMush)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildForest();
      utils.printToDom('#edit-shroom', '');
    })
    .catch((err) => console.error('could not edit mushroom', err));
};

const showShroomForm = (e) => {
  editMushroom.showForm(e.target.closest('.card').id);
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

const mycoMushroomController = (e) => {
  if (e.target.checked) {
    const newMycologistMushroom = {
      mushroomId: e.target.closest('.card').id,
      mycologistUid: e.target.dataset.mycologistUid,
    };

    mycologistMushroomData.addMycologistMushroom(newMycologistMushroom)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildForest();
        utils.printToDom('#single-myco', '');
        utils.printToDom('#new-shroom', '');
      })
      .catch((err) => console.error('could not create myco mushroom', err));
  } else {
    mycologistMushroomData.deleteMycoMushroom(e.target.id)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildForest();
        utils.printToDom('#single-myco', '');
        utils.printToDom('#new-shroom', '');
      })
      .catch((err) => console.error('delete myco mushroom failed', err));
  }
};

const buildForest = () => {
  smash.getMushroomsWithOwners()
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
    })
    .catch((err) => console.error('get mushroomsWithOwners broke :/', err));
};

const forestEvents = () => {
  $('body').on('click', '.delete-shroom', removeShroomEvent);
  $('body').on('click', '.edit-shroom', showShroomForm);
  $('body').on('click', '#mush-creator', addShroomEvent);
  $('body').on('click', '#mush-editor', editShroomEvent);
  $('body').on('click', '#show-add-mush', newMushroom.showForm);
  $('body').on('click', '.myco-shroom-checkbox', mycoMushroomController);
};

export default { buildForest, forestEvents };
