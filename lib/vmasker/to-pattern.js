VMasker.toPattern = function(value, opts) {
  var pattern = (typeof opts === 'object' ? opts.pattern : opts),
      patternChars = pattern.replace(/\W/g, ''),
      output = pattern.split(""),
      values = value.toString().replace(/\W/g, ""),
      charsValues = values.replace(/\W/g, ''),
      index = 0,
      i,
      outputLength = output.length,
      placeholder = (typeof opts === 'object' ? opts.placeholder : undefined)
  ;

  for (i = 0; i < outputLength; i++) {
    // Reached the end of input
    if (index >= values.length) {
      if (patternChars.length == charsValues.length) {
        return output.join("");
      }
      else if ((placeholder !== undefined) && (patternChars.length > charsValues.length)) {
        return this.addPlaceholdersToOutput(output, i, placeholder).join("");
      }
      else {
        break;
      }
    }
    // Remaining chars in input
    else{
      if ((output[i] === this.keys.digit && values[index].match(/[0-9]/)) ||
          (output[i] === this.keys.alpha && values[index].match(/[a-zA-Z]/)) ||
          (output[i] === this.keys.alphanum && values[index].match(/[0-9a-zA-Z]/))) {
        output[i] = values[index++];
      } else if (output[i] === this.keys.digit || output[i] === this.keys.alpha || output[i] === this.keys.alphanum) {
        if(placeholder !== undefined){
          return this.addPlaceholdersToOutput(output, i, placeholder).join("");
        }
        else{
          return output.slice(0, i).join("");
        }
      }
    }
  }
  return output.join("").substr(0, i);
};

VMasker.addPlaceholdersToOutput = function(output, index, placeholder) {
  for (; index < output.length; index++) {
    if(output[index] === this.keys.digit || output[index] === this.keys.alpha || output[index] === this.keys.alphanum) {
      output[index] = placeholder;
    }
  }
  return output;
};

VMasker.keys = {
  digit: "9",
  alpha: "A",
  alphanum: "S"
};
