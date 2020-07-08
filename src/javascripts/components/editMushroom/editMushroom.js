import mushroomData from '../../helpers/data/mushroomData';

import utils from '../../helpers/utils';

// populate the form with whatever mushroom info

const showForm = (mushroomId) => {
  mushroomData.getMushroomById(mushroomId)
    .then((response) => {
      const mushroom = response.data;

      const domString = `
        <h2>Edit Mushroom</h2>
        <form class="edit-mushroom" id=${mushroomId}>
          <div class="form-group">
            <label for="edit-mush-name">Name:</label>
            <input type="text" class="form-control" id="edit-mush-name" placeholder="Cordyceps" value=${mushroom.name}>
          </div>
          <div class="form-group">
            <label for="edit-mush-size">Size:</label>
            <input type="text" class="form-control" id="edit-mush-size" placeholder="M" value=${mushroom.size}>
          </div>
          <div class="form-group">
            <label for="edit-mush-location">Location:</label>
            <input type="text" class="form-control" id="edit-mush-location" placeholder="Farm" value=${mushroom.location}>
          </div>
          <div class="form-group">
            <label for="edit-mush-weight">Weight (in grams):</label>
            <input type="number" class="form-control" id="edit-mush-weight" placeholder="20" value=${mushroom.weight}>
          </div>
          <button type="submit" class="btn btn-primary" id="mush-editor">Update</button>
        </form>
      `;

      utils.printToDom('#new-shroom', domString);
    })
    .catch((err) => console.error('get single mushroom failed', err));
};

export default { showForm };
