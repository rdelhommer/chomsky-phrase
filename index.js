var PhraseFactory = require('./lib/phrase-factory');
var WordFactory = require('./lib/word-factory');
var NumberFactory = require('./lib/number-factory');
var WordnikConfig = require('./lib/wordnik-config');
var resultFilters = require('./lib/result-filters');

module.exports = {
  PhraseFactory: PhraseFactory,
  WordFactory: WordFactory,
  NumberFactory: NumberFactory,
  WordnikConfig: WordnikConfig,
  resultFilters: resultFilters
};