# Chomsky-Phrase

Generates memorable phrases using the Wordnik API. Phrases have sentence structure similar to Noam Chomsky's famous 'Colorless green ideas sleep furiously' and are not guaranteed to make sense

Can be installed globally as a CLI tool or locally as a project dependency.  Has no third-party dependencies.

## Local
### Installation
```sh
npm install chomsky-phrase
```

### Usage
```js
var chomsky = require('chomsky-phrase');
var phraseFactory = new chomsky.PhraseFactory();

phraseFactory.getPhrase()
  .then((phraseArray) => {
    console.log(phraseArray);
  });
```

## Global
### Installation
```sh
npm install chomsky-phrase -g
```

### Usage
```sh
chomsky-phrase

>>> [ 29, 'astray', 'skirts', 'abound', 'wildly' ]
```
