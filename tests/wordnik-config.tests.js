var ava = require('ava');
var WordnikConfig = require('../index').WordnikConfig;

ava('Error if no word type', t => {
  var caughtErr = null;

  try {
    var config = new WordnikConfig();
  } catch (error) {
    caughtErr = error;
    t.is(error.message, 'Must provide a word type to the api config');
  }

  if (caughtErr) {
    t.pass();
  } else {
    t.fail();
  }
});

ava('Default corpus count is 5000', t => {
  var config = new WordnikConfig('noun');

  t.true(config.url.indexOf('minCorpusCount=5000&') !== -1);
});

ava('Default min length is 2', t => {
  var config = new WordnikConfig('noun');

  t.true(config.url.indexOf('minLength=2&') !== -1);
});

ava('Default max length is 8', t => {
  var config = new WordnikConfig('noun');

  t.true(config.url.indexOf('maxLength=8&') !== -1);
});

ava('Corpus count is configurable', t => {
  var config = new WordnikConfig('noun', 111, 222, 333);

  t.true(config.url.indexOf('minCorpusCount=111&') !== -1);
});

ava('Min length is configurable', t => {
  var config = new WordnikConfig('noun', 111, 222, 333);

  t.true(config.url.indexOf('minLength=222&') !== -1);
});

ava('Max length is configurable', t => {
  var config = new WordnikConfig('noun', 111, 222, 333);

  t.true(config.url.indexOf('maxLength=333&') !== -1);
});
