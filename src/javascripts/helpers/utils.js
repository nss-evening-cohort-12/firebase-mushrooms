const printToDom = (selector, text) => {
  $(selector).html(text);
};

const fbCollToArray = (response) => {
  const collection = response.data;
  const newCollection = [];
  Object.keys(collection).forEach((modelId) => {
    collection[modelId].id = modelId;
    newCollection.push(collection[modelId]);
  });
  return newCollection;
};

export default { printToDom, fbCollToArray };
