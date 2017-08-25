function NumberFactory(min, max) {
  if (max < min) throw new Error('Max value must be greater than min value');

  this.create = create;

  function create(callback) {
    return callback(Math.floor(Math.random() * (max - min + 1) + min));
  }
}

module.exports = NumberFactory;
