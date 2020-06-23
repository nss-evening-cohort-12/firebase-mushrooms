const mycologistMaker = (mycologist) => {
  const domString = `
    <div class="col-3">
      <div class="card myco-card border-0 rounded-0" id=${mycologist.id}>
        <div class="card-body">
          <h5 class="card-title text-center">${mycologist.name}</h5>
        </div>
        <div class="card-footer">
          <small class="text-muted">They are ${mycologist.age} years old</small>
        </div>
      </div>
    </div>
  `;

  return domString;
};

export default { mycologistMaker };
