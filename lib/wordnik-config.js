function WordnikConfig(wordType, minCorpusCount, minLength, maxLength) {
  if (!wordType) throw new Error('Must provide a word type to the api config');

  var _minCorpusCount = minCorpusCount || 5000;
  var _minLength = minLength || 2;
  var _maxLength = maxLength || 8;

  this.url =
    'http://api.wordnik.com:80/v4/words.json/randomWords?' +
    'hasDictionaryDef=true&' +
    'includePartOfSpeech=' + wordType + '&' +
    'excludePartOfSpeech=proper-noun&' +
    'minCorpusCount=' + _minCorpusCount + '&' +
    'maxCorpusCount=-1&' +
    'minDictionaryCount=1&' +
    'maxDictionaryCount=-1&' +
    'minLength=' + _minLength + '&' +
    'maxLength=' + _maxLength + '&' +
    'limit=100&' +
    'api_key=7a65a66507d6644aee0090e58ed0dd453c53d05559e3de41a';
}

module.exports = WordnikConfig;