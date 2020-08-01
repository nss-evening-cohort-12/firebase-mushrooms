import utils from '../../helpers/utils';

import './newMushroom.scss';

function imageInputWatcher() {
  $('#mush-image-label').html(this.files[0].name);
}

const showForm = () => {
  const domString = `
    <form>
      <div class="form-group">
        <label for="mush-name">Name:</label>
        <input type="text" class="form-control" id="mush-name" placeholder="Cordyceps">
      </div>
      <div class="form-group">
        <label for="mush-size">Size:</label>
        <input type="text" class="form-control" id="mush-size" placeholder="M">
      </div>
      <div class="form-group">
        <label for="mush-location">Location:</label>
        <input type="text" class="form-control" id="mush-location" placeholder="Farm">
      </div>
      <div class="form-group">
        <label for="mush-weight">Weight (in grams):</label>
        <input type="number" class="form-control" id="mush-weight" placeholder="20">
      </div>
      <div class="custom-file form-group">
        <input type="file" class="custom-file-input" id="mush-image">
        <label class="custom-file-label" for="mush-image" id="mush-image-label">Mushroom Image</label>
      </div>
      <button type="submit" class="btn btn-primary col-md-3" id="mush-creator">Submit</button>
      <p class="col-md-9" id="new-mush-validate"></p>
    </form>
  `;

  utils.printToDom('#new-shroom', domString);

  $('body').on('change', '#mush-image', imageInputWatcher);
};

export default { showForm };
