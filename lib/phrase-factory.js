function PhraseFactory(factories) {
  var _factories = factories;

  this.create = create;

  function create(callback) {
    getNextItem(0, [], callback);

    function getNextItem(currentIndex, phraseUnderConstruction, finishedCallback) {
      _factories[currentIndex].create((result, err) => {
        // Bubble up if err
        if (err) return finishedCallback(null, err);

        // Add the next item to the phrase
        phraseUnderConstruction.push(result);

        // Finish if no more factories
        if (currentIndex === _factories.length - 1) {
          return finishedCallback(phraseUnderConstruction);
        }

        // Get the next item in the phrase
        setTimeout(() => {
          getNextItem(currentIndex + 1, phraseUnderConstruction, finishedCallback);
        });
      });
    }
  }
}

module.exports = PhraseFactory;