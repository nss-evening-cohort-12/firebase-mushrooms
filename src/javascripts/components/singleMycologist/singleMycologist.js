import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';

import './singleMycologist.scss';

const buildMycologist = (e) => {
  const mycologistId = e.target.closest('.card').id;
  smash.getSingleMycoWithShrooms(mycologistId)
    .then((mycologist) => {
      console.warn('here is your mycologist:', mycologist);
      const domString = `
        <h2 class="text-center">Featured Mycologist</h2>
        <div class="col-12">
          <div class="card text-white bg-dark border-0 rounded-0">
            <div class="card-header">Mycologist ${mycologist.name} (Age: ${mycologist.age})</div>
            <div class="card-body"></div>
          </div>
        </div>
      `;

      utils.printToDom('#single-myco', domString);
    })
    .catch((err) => console.error('problem with single mycologist', err));
};

export default { buildMycologist };
