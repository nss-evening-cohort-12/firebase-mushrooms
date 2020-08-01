import firebase from 'firebase/app';
import 'firebase/storage';

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

  const name = $('#mush-name').val();
  const size = $('#mush-size').val();
  const location = $('#mush-location').val();
  const weight = $('#mush-weight').val() * 1;
  const file = document.getElementById('mush-image').files[0];

  if (!name || !size || !location || !weight || !file) {
    $('#new-mush-validate').fadeIn();
    $('#new-mush-validate').html('*All fields are required');
    setTimeout(() => {
      $('#new-mush-validate').fadeOut();
    }, 2000);
    return;
  }

  const image = file.name;
  const ref = firebase.storage().ref(`mushrooms/${image}`);

  const newMush = {
    name,
    size,
    location,
    weight,
    image: '',
  };

  ref.put(file).then(() => {
    ref.getDownloadURL().then((url) => {
      newMush.image = url;
      mushroomData.addMushroom(newMush).then(() => {
        // eslint-disable-next-line no-use-before-define
        buildForest();
      });
    });
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
