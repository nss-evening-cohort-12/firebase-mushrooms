const mushroomMaker = (mushroom) => {
  const domString = `
    <div class="col-3">
      <div class="card border-0 rounded-0 bg-dark text-light">
      <div class="card-header text-center">${mushroom.name}</div>
        <div class="card-body">
          <h5 class="card-title">${mushroom.location}</h5>
          <p class="card-text">This mushroom is of size <b>${mushroom.size}</b> and weighs <b>${mushroom.weight}</b> grams</p>
        </div>
      </div>
    </div>
  `;

  return domString;
};

export default { mushroomMaker };
