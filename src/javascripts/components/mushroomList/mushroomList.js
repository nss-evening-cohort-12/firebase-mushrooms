import mushroomComponent from '../mushroom/mushroom';
import mushroomData from '../../helpers/data/mushroomData';
import utils from '../../helpers/utils';

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
    })
    .catch((err) => console.error('get mushrooms broke :/', err));
};

export default { buildForest };
