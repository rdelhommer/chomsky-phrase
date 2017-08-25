exports.filterWithEndings = filterWithEndings;
exports.filterWithOutEndings = filterWithOutEndings;
exports.filterContractions = filterContractions;
exports.filterProperNouns = filterProperNouns;

function filterWithEndings(endings) {
  return (word) => {
    return endings.some((e) => {
      return word.endsWith(e);
    });
  };
}

function filterWithOutEndings(endings) {
  return (word) => {
    return !endings.some((e) => {
      return word.endsWith(e);
    });
  };
}

function filterContractions(word) {
  return word.indexOf('\'') === -1;
}

function filterProperNouns(word) {
  return word.charCodeAt(0) > 96;
}
