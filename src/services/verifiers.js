function isInvalidNumber(number) {
  if (!number || Number.isNaN(number)) {
    return true;
  }
  return false;
}

module.exports = {
  isInvalidNumber,
};
