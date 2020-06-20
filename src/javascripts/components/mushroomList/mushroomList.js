import mushroomData from '../../helpers/data/mushroomData';

// import utils from '../../helpers/utils';

// get all mushrooms
// loop and create domstring
// printtodom

const buildForest = () => {
  mushroomData.getMushrooms()
    .then((response) => console.warn('Get Mushrooms worked!!', response.data))
    .catch((err) => console.error('get mushrooms broke :/', err));
  // const domString = '<h1>It does actually work</h1>';
  // utils.printToDom('#forest', domString);
};

export default { buildForest };
