VMasker.toAlphaNumeric = function(value) {
  return value.toString().replace(/[^a-z0-9 ]+/i, "");
};
