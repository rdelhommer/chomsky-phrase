#!/usr/bin/env node
 
var lib = require('../index.js');
var phraseFactory = new lib.PhraseFactory();

phraseFactory.getPhrase()
  .then((phraseArray) => {
    console.log(phraseArray);
  });
