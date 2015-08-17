VMasker.toMoney = function(value, opts) {
  opts = this.mergeMoneyOptions(opts);
  if (opts.zeroCents) {
    opts.lastOutput = opts.lastOutput || "";
    var zeroMatcher = ("("+ opts.separator +"[0]{0,"+ opts.precision +"})"),
        zeroRegExp = new RegExp(zeroMatcher, "g"),
        digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
        lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0
    ;
    value = value.toString().replace(zeroRegExp, "");
    if (digitsLength < lastDigitLength) {
      value = value.slice(0, value.length - 1);
    }
  }
  var number = value.toString().replace(/[\D]/g, ""),
      clearDelimiter = new RegExp("^(0|\\"+ opts.delimiter +")"),
      clearSeparator = new RegExp("(\\"+ opts.separator +")$"),
      money = number.substr(0, number.length - opts.moneyPrecision),
      masked = money.substr(0, money.length % 3),
      cents = new Array(opts.precision + 1).join("0")
  ;
  money = money.substr(money.length % 3, money.length);
  for (var i = 0, len = money.length; i < len; i++) {
    if (i % 3 === 0) {
      masked += opts.delimiter;
    }
    masked += money[i];
  }
  masked = masked.replace(clearDelimiter, "");
  masked = masked.length ? masked : "0";
  if (!opts.zeroCents) {
    var beginCents = number.length - opts.precision,
        centsValue = number.substr(beginCents, opts.precision),
        centsLength = centsValue.length,
        centsSliced = (opts.precision > centsLength) ? opts.precision : centsLength
    ;
    cents = (cents + centsValue).slice(-centsSliced);
  }
  var output = opts.unit + masked + opts.separator + cents + opts.suffixUnit;
  return output.replace(clearSeparator, "");
};

VMasker.mergeMoneyOptions = function(options) {
  options = options || {};
  options = {
    precision: options.hasOwnProperty("precision") ? options.precision : 2,
    separator: options.separator || ",",
    delimiter: options.delimiter || ".",
    unit: options.unit && (options.unit.replace(/[\s]/g,'') + " ") || "",
    suffixUnit: options.suffixUnit && (" " + options.suffixUnit.replace(/[\s]/g,'')) || "",
    zeroCents: options.zeroCents,
    lastOutput: options.lastOutput
  };
  options.moneyPrecision = options.zeroCents ? 0 : options.precision;
  return options;
};
