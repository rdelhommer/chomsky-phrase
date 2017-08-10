# Chomsky-Phrase

Generates memorable phrases using the Wordnik API getRandomWords method. Phrases have sentence structure similar to Noam Chomsky's famous 'Colorless green ideas sleep furiously' and are not guaranteed to make sense.

Can be installed globally as a CLI tool or locally as a project dependency.  Has no third-party dependencies.

## Brief Implementation Details
For each word in a phrase, chomsky-phrase sends a request to the Wordnik API getRandomWords method. A random word from the response is then selected. This implementation was chosen to let users obtain proper word tenses since the Wordnik API useCanonicalForm option seems to be broken.

## Local
### Installation
```sh
npm install chomsky-phrase
```

### Default Usage
```js
var chomsky = require('chomsky-phrase');
var phraseFactory = chomsky.PhraseFactory.createDefault();

phraseFactory.create((phrase) => {
  console.log(phrase);
});
```

### Custom Phrases
You can build a custom phrase factory to output a phrase of any number of words and with any structure.

#### WordnikConfig
Each WordFactory takes a WordnikConfig that defines the API options for getting a random word.  At this time, the following url options are configurable:
* wordType
* minCorpusCount
* minLength
* maxLength

Example:
```js
var chomsky = require('chomsky-phrase');

// Get Adjectives between 1 and 25 characters long with minCorpusCount = 10000
var adjectiveConfig = new chomsky.WordnikConfig('adjective', 10000, 1, 25);
```

See the Wordnik API [getRandomWords documentation](http://developer.wordnik.com/docs.html#!/words/getRandomWords_get_3) for more information

#### WordFactory
A WordFactory creates words. Each WordFactory takes a WordnikConfig and optional filters to be used on the getRandomWords API response.  Filter functions are intended to be used with the Array.prototype.filter function. Below is an example filter function that keeps only words that end with 'ing'
```js
function onlyIng(word) {
  return word.endsWith('ing');
}
```
Filters used in the default PhraseFactory can be found [here](https://github.com/rdelhommer/chomsky-phrase/blob/master/lib/result-filters.js)

Example:
```js
var chomsky = require('chomsky-phrase');

var adjectiveConfig = new chomsky.WordnikConfig('adjective');
var adjectiveFactory = new chomsky.WordFactory(adjectiveConfig, [
  chomsky.resultFilters.filterWithEndings([ 'y', 'ing' ]),
  chomsky.resultFilters.filterContractions
]);

console.log(adjectiveFactory.create());

>>> 'fiery'
```

#### PhraseFactory
Inject a WordFactory array that will be used to create the phrase. Each WordFactory is created in order to form the phrase. 

IE - The final phrase will be
```js
[
  WordFactoryArray[0].create(),
  WordFactoryArray[1].create(),
  ...
  WordFactoryArray[n].create()
]
```

See [PhraseFactory.createDefault()](https://github.com/rdelhommer/chomsky-phrase/blob/38fc34c51fe33a6d2f63c35edfce5c29619a0475/lib/phrase-factory.js#L31) to see how the default factory is created.

## Global
Installing chomsky-phrase globally will allow you to create phrases with the default PhraseFactory from the CLI.  It is not configurable at this time.
### Installation
```sh
npm install chomsky-phrase -g
```

### Usage
```sh
chomsky-phrase

>>> [ 3, 'sultry', 'clogs', 'persist', 'soundly' ]
```
