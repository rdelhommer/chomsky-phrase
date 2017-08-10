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

PhraseFactory.createDefault = function () {
  var WordnikConfig = require('./wordnik-config');
  var WordFactory = require('./word-factory');
  var NumberFactory = require('./number-factory');
  var resultFilters = require('./result-filters');

  var nounConfig = new WordnikConfig('noun');
  var nounFactory = new WordFactory(nounConfig, [
    resultFilters.filterWithEndings([ 's' ]),
    resultFilters.filterProperNouns,
    resultFilters.filterContractions
  ]);

  var verbConfig = new WordnikConfig('verb');
  var verbFactory = new WordFactory(verbConfig, [
    resultFilters.filterWithOutEndings([ 'ing', 'ed', 's', 'en' ]),
    resultFilters.filterContractions
  ]);

  var adjectiveConfig = new WordnikConfig('adjective');
  var adjectiveFactory = new WordFactory(adjectiveConfig, [
    resultFilters.filterWithEndings([ 'y', 'ing' ]),
    resultFilters.filterContractions
  ]);

  var adverbConfig = new WordnikConfig('adverb');
  var adverbFactory = new WordFactory(adverbConfig, [
    resultFilters.filterWithEndings([ 'ly' ]),
    resultFilters.filterContractions
  ]);

  var numberFactory = new NumberFactory(1, 100);

  return new PhraseFactory([
    numberFactory,
    adjectiveFactory,
    nounFactory,
    verbFactory,
    adverbFactory
  ]);
}

module.exports = PhraseFactory;