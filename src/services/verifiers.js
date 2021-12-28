function isInvalidNumber(number) {
  if (!number || Number.isNaN(number)) {
    return true;
  }
  return false;
}

function isNullOrEmpty(text) {
  if (!text || text.length === 0) {
    return true;
  }
  return false;
}

function isAnArray(array) {
  if (Array.isArray(array)) {
    console.log('VAI DAR CERTO!')
    return true;
  }
  return false;
}

module.exports = {
  isInvalidNumber,
  isNullOrEmpty,
  isAnArray,
};
