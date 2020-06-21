// import mycologistData from '../../helpers/data/mycologistData';
// import mushroomData from '../../helpers/data/mushroomData';
import smash from '../../helpers/data/smash';

// import utils from '../../helpers/utils';

// get all mushrooms
// loop and create domstring
// printtodom

const buildForest = () => {
  smash.getSingleMycoWithMushies('mycologist1')
    .then((r) => console.warn(r))
    .catch((e) => console.error(e));
  // mycologistData.getMycologists()
  //   .then((response) => console.warn('worked!', response))
  //   .catch((err) => console.error(err));

  // mushroomData.getMushrooms()
  //   .then((response) => console.warn('Get Mushrooms worked!!', response))
  //   .catch((err) => console.error('get mushrooms broke :/', err));
  // const domString = '<h1>It does actually work</h1>';
  // utils.printToDom('#forest', domString);
};

export default { buildForest };
