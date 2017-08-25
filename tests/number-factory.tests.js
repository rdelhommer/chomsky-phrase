var ava = require('ava');
var NumberFactory = require('../index').NumberFactory;

ava('Error if max is less than min', t => {
  var caughtErr = null;

  try {
    var factory = new NumberFactory(5, 1);
  } catch (err) {
    caughtErr = err;
  }

  t.is(caughtErr.message, 'Max value must be greater than min value');
});

ava('Created number is less than max and greater than min', t => {
  var factory = new NumberFactory(1, 5);

  testOneThousandCreations(0);

  function testOneThousandCreations(count) {
    if (count > 1000) {
      return t.pass();
    }

    factory.create((createdNumber) => {
      if (createdNumber <= 5 && createdNumber >= 1) {
        testOneThousandCreations(count + 1);
      } else {
        t.fail(createdNumber + ' is not <= 5 and >= 1');
      }
    });
  }
});