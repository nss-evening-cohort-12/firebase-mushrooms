import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';

import './singleMycologist.scss';

const buildMycologist = (e) => {
  const mycologistId = e.target.closest('.card').id;
  smash.getSingleMycoWithShrooms(mycologistId)
    .then((mycologist) => {
      let domString = `
        <h2 class="text-center">Featured Mycologist</h2>
        <div class="col-12">
          <div class="card text-white bg-dark border-0 rounded-0">
            <div class="card-header">Mycologist ${mycologist.name} (Age: ${mycologist.age})</div>
            <div class="card-body">
            <h3 class="card-title">Mushroom(s) Owned:</h3>
      `;

      mycologist.mushrooms.forEach((mushroom) => {
        domString += `<p class="card-text">${mushroom.name}</p>`;
      });

      domString += `
            </div>
          </div>
        </div>
      `;

      utils.printToDom('#single-myco', domString);
    })
    .catch((err) => console.error('problem with single mycologist', err));
};

export default { buildMycologist };
