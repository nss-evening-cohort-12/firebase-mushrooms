import mycologistComponent from '../mycologist/mycologist';
import mycologistData from '../../helpers/data/mycologistData';
import utils from '../../helpers/utils';

import './mycologistList.scss';

const buildHut = () => {
  mycologistData.getMycologists()
    .then((mycologists) => {
      let domString = `
        <div class="hut">
          <h2 class="text-center">Mycologist Hut</h2>
          <div class="d-flex flex-wrap">
      `;

      mycologists.forEach((mycologist) => {
        domString += mycologistComponent.mycologistMaker(mycologist);
      });

      domString += '</div></div>';

      utils.printToDom('#hut', domString);
    })
    .catch((err) => console.error('getMycologists failed', err));
};

export default { buildHut };
