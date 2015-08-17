VMasker.toNumber = function(value) {
  return value.toString().replace(/(?!^-)[^0-9]/g, "");
};
