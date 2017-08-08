var http = require('http');

function PhraseFactory() {
  var wordTypes = [
    'noun',
    'verb',
    'adjective',
    'number',
    'adverb'
  ];

  var defaultStructure = [
    'number',
    'adjective',
    'noun',
    'verb',
    'adverb'
  ];

  this.getPhrase = getPhrase;

  function getNumber() {
    return Math.floor(Math.random() * 100);
  }

  function getWord(wordType) {
    return new Promise((resolve, reject) => {
      var url =
        'http://api.wordnik.com:80/v4/words.json/randomWords?' +
        'hasDictionaryDef=true&' +
        'includePartOfSpeech=' + wordType + '&' +
        'excludePartOfSpeech=proper-noun&' +
        'minCorpusCount=5000&' +
        'maxCorpusCount=-1&' +
        'minDictionaryCount=1&' +
        'maxDictionaryCount=-1&' +
        'minLength=2&' +
        'maxLength=8&' +
        'limit=100&' +
        'api_key=7a65a66507d6644aee0090e58ed0dd453c53d05559e3de41a';

        http.get(url, (res) => {
        res.setEncoding('utf8');
        var rawData = '';

        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            // HACK: This will sometimes (albeit rarely) fail
            // TODO: Make it more robust by retrying
            var parsedData = JSON.parse(rawData);
            var filtered = filterResults(parsedData, wordType);
            var ret = filtered[Math.floor(Math.random()*filtered.length)];

            return resolve(ret);
          } catch (error) {
            return reject(error);
          }
        });
      });
    });

    function filterResults(results, wordType) {
      var adjEndings = [
        'y',
        'ing'
      ];

      var nounEndings = [
        's'
      ];

      var adverbEndings = [
        'ly'
      ];

      var verbBadEndings = [
        'ing',
        'ed',
        's',
        'en'
      ];

      switch (wordType) {
        case 'adjective':
          return results.map(r => r.word)
            .filter(w => filterContractions(w))
            .filter(w => filterWithEndings(w, adjEndings));
        case 'noun':
          return results.map(r => r.word)
            .filter(w => filterProperNouns(w))
            .filter(w => filterContractions(w))
            .filter(w => filterWithEndings(w, nounEndings));
        case 'verb':
          return results.map(r => r.word)
            .filter(w => filterContractions(w))
            .filter(w => filterWithOutEndings(w, verbBadEndings));
        case 'adverb':
          return results.map(r => r.word)
            .filter(w => filterContractions(w))
            .filter(w => filterWithEndings(w, adverbEndings));
      }

      function filterWithEndings(word, endings) {
        return endings.some((e) => {
          return word.endsWith(e);
        });
      }

      function filterWithOutEndings(word, endings) {
        return !endings.some((e) => {
          return word.endsWith(e);
        });
      }

      function filterContractions(word) {
        return word.indexOf('\'') === -1;
      }

      function filterProperNouns(word) {
        return word.charCodeAt(0) > 96;
      }
    }
  }

  function getPhrase(phraseStructure) {
    return new Promise((resolve, reject) => {
      if (!phraseStructure) {
        phraseStructure = defaultStructure;
      }

      var promises = [];
      phraseStructure.forEach((wordType) => {
        promises.push(new Promise((resolveInternal, rejectInternal) => {
          if (wordType === 'number') {
            return resolveInternal(getNumber());
          } else {
            getWord(wordType).then(resolveInternal).catch(rejectInternal);
          }
        }));
      });

      Promise.all(promises)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = PhraseFactory;