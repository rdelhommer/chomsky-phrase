#!/usr/bin/env node
 
var chomsky = require('../index.js');

var phraseFactory = chomsky.PhraseFactory.createDefault();

phraseFactory.create(console.log);
