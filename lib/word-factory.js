function WordFactory(http, wordnikConfig, resultFilters) {

  var _wordnikConfig = wordnikConfig;
  var _resultFilters = resultFilters || [];

  this.create = create;

  function create(callback) {
    http.get(_wordnikConfig.url, (res) => {
      res.setEncoding('utf8');
      var rawData = '';

      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          // HACK: This will sometimes (albeit very rarely) fail
          // TODO: Make it more robust by retrying
          var parsedData = JSON.parse(rawData);
          var filtered = filterResults(parsedData);
          var ret = filtered[Math.floor(Math.random()*filtered.length)];

          return callback(ret, null);
        } catch (error) {
          return callback(null, error);
        }
      });
    });

    function filterResults(results) {
      var ret = results.map(r => r.word);
      _resultFilters.forEach((filter) => {
        ret = ret.filter(word => filter(word));
      });

      return ret;
    }
  }
}

module.exports = WordFactory;