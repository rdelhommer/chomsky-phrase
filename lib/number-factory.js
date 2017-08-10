function NumberFactory(min, max) {
  this.create = create;

  function create(callback) {
    return callback(Math.floor(Math.random() * (max - min + 1) + min));
  }
}

module.exports = NumberFactory;
