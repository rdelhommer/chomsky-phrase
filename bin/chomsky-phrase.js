#!/usr/bin/env node
 
var chomsky = require('../index.js');
var resultFilters = require('../lib/result-filters');

var phraseFactory = new chomsky.PhraseFactory();

var nounConfig = new chomsky.WordnikConfig('noun');
var nounFactory = new chomsky.WordFactory(nounConfig, [
  resultFilters.filterWithEndings([ 's' ]),
  resultFilters.filterProperNouns,
  resultFilters.filterContractions
]);

var verbConfig = new chomsky.WordnikConfig('verb');
var verbFactory = new chomsky.WordFactory(verbConfig, [
  resultFilters.filterWithOutEndings([ 'ing', 'ed', 's', 'en' ]),
  resultFilters.filterContractions
]);

var adjectiveConfig = new chomsky.WordnikConfig('adjective');
var adjectiveFactory = new chomsky.WordFactory(adjectiveConfig, [
  resultFilters.filterWithEndings([ 'y', 'ing' ]),
  resultFilters.filterContractions
]);

var adverbConfig = new chomsky.WordnikConfig('adverb');
var adverbFactory = new chomsky.WordFactory(adverbConfig, [
  resultFilters.filterWithEndings([ 'ly' ]),
  resultFilters.filterContractions
]);

var numberFactory = new chomsky.NumberFactory(1, 100);

var phraseFactory = new chomsky.PhraseFactory([
  numberFactory,
  adjectiveFactory,
  nounFactory,
  verbFactory,
  adverbFactory
]);

phraseFactory.create((phrase) => {
  console.log(phrase);
});
