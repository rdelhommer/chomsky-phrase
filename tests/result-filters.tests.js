var ava = require('ava');
var filters = require('../index').resultFilters;

ava('filterWithEndings - true if ends with ending', t => {
  var filterFunc = filters.filterWithEndings(['ing', 'ly', 'ed']);

  t.true(filterFunc('running'));
  t.true(filterFunc('swimmingly'));
  t.true(filterFunc('fasted'));
});

ava('filterWithEndings - false if does not end with ending', t => {
  var filterFunc = filters.filterWithEndings(['ing', 'ly', 'ed']);

  t.false(filterFunc('beep'));
});

ava('filterWithOutEndings - true if does not end with ending', t => {
  var filterFunc = filters.filterWithOutEndings(['ing', 'ly', 'ed']);

  t.true(filterFunc('beep'));
});

ava('filterWithOutEndings - false if ends with ending', t => {
  var filterFunc = filters.filterWithOutEndings(['ing', 'ly', 'ed']);

  t.false(filterFunc('running'));
  t.false(filterFunc('swimmingly'));
  t.false(filterFunc('fasted'));
});

ava('filterContractions - true if does not contain apostrophe', t => {
  t.true(filters.filterContractions('cannot'));
});

ava('filterWithEndings - false if contains apostrophe', t => {
  t.false(filters.filterContractions('can\'t'));
});

ava('filterProperNouns - true if first letter is not uppercase', t => {
  t.true(filters.filterProperNouns('cat'));
});

ava('filterProperNouns - false if first letter is uppercase', t => {
  t.false(filters.filterProperNouns('Steve'));
});
