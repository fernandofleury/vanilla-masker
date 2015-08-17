var VMasker = function(el) {
  if (!el) {
    throw new Error("VanillaMasker: There is no element to bind.");
  }
  var elements = ("length" in el) ? (el.length ? el : []) : [el];
  return new VanillaMasker(elements);
};
