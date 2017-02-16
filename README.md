# What's this

[![Build Status](https://travis-ci.org/Creditas/vanilla-masker.svg)](https://travis-ci.org/Creditas/vanilla-masker)
[![Code Climate](https://codeclimate.com/github/BankFacil/vanilla-masker.png)](https://codeclimate.com/github/BankFacil/vanilla-masker)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/bankfacil_dev.svg)](https://saucelabs.com/u/bankfacil_dev)

It's a pure JavaScript mask input.
Now you can use a simple and pure javascript lib to mask your input elements, without need to load jQuery or Zepto to do it.

Let's live a lightweight client-side world using micro libraries as VanillaMasker is!
Don't worry about where this will work, because this is a cross-browser and cross-device library. And if you find any bug, please let us know about it [reporting an issue](https://github.com/Creditas/vanilla-masker/issues).

If you wanna see how this lib works, click to test this [demo page](http://bankfacil.github.io/vanilla-masker/demo.html).

# How to install

### Download script
* [development version](https://raw.githubusercontent.com/Creditas/vanilla-masker/1.1.0/lib/vanilla-masker.js) (6.2 Kbytes);
* [minified version](https://raw.githubusercontent.com/Creditas/vanilla-masker/1.1.0/build/vanilla-masker.min.js) (3.24 Kbytes);
* [gzipped version](https://raw.githubusercontent.com/Creditas/vanilla-masker/1.1.0/build/vanilla-masker.min.gz.js) (1.3 Kbytes);

We have the following CDN available, for development or minified versions:

`//cdn.jsdelivr.net/vanilla-masker/1.1.0/vanilla-masker.js`
`//cdn.jsdelivr.net/vanilla-masker/1.1.0/vanilla-masker.min.js`

We intent to automatically send new versions to the CDN, but keep in mind that the version you want might not be available there. Of course you can always download and put it in your own site.

### NPM
For npm users you just run this command: `npm install vanilla-masker --save`

### Bower
You can install it via bower too, using this command: `bower install --save vanilla-masker`

### Meteor
And you can install inside your meteor projects with this command: `meteor add bankfacil:vanilla-masker`

# How to use

### Loading the lib

Like I said, you need to download and put this lib in your own site, using this tag below:

``` html
<html>
   <head></head>
   <body>
      <input type="text">
      <!-- Loading the vanilla-masker lib -->
      <script src="vanilla-masker.min.js"></script>
   </body>
</html>
```

### Common uses

#### Money format

``` javascript

// Masking input element to money.
VMasker(document.querySelector("data-js-input")).maskMoney();

// Masking input element to money with options.
VMasker(document.querySelector("data-js-input")).maskMoney({
  // Decimal precision -> "90"
  precision: 2,
  // Decimal separator -> ",90"
  separator: ',',
  // Number delimiter -> "12.345.678"
  delimiter: '.',
  // Money unit -> "R$ 12.345.678,90"
  unit: 'R$',
  // Money unit -> "12.345.678,90 R$"
  suffixUnit: 'R$',
  // Force type only number instead decimal,
  // masking decimals with ",00"
  // Zero cents -> "R$ 1.234.567.890,00"
  zeroCents: true
});

// Masking an array of input elements to money.
VMasker(document.querySelectorAll("data-js-input")).maskMoney();

// Converts number to money string
VMasker.toMoney(1234); // -> R$ 1.234,00
```

#### Only numbers

``` javascript
// Masking input element to number.
VMasker(document.querySelector("data-js-input")).maskNumber();

// Converts any string to number
VMasker.toNumber("123ac34"); // -> 12334
VMasker.toNumber("-123ac34"); // -> -12334
```

#### Custom pattern

``` javascript
// Listen the input element masking it to format with pattern.
VMasker(document.querySelector("input")).maskPattern("(99) 9999-9999");

// Converts value to masked phone
VMasker.toPattern(1099911111, "(99) 9999-9999"); // -> (10) 9991-1111
// Converts value to masked date
VMasker.toPattern(12122000, "99/99/9999"); // -> 12/12/2000
// Converts value to masked document
VMasker.toPattern(99911111101, "999.999.999-99"); // -> 999.111.111-01
// Converts value to masked car plate
VMasker.toPattern('ABC1234', "AAA-9999"); // -> ABC-1234
// Converts value to masked vehicle identification
VMasker.toPattern('9BGRD08X04G117974', "SS.SS.SSSSS.S.S.SSSSSS"); // -> 9B.GR.D08X0.4.G.117974

// Pass in an optional placeholder option to represent remaining characters to be entered
VMasker.toPattern('4', {pattern: "(999) 999-9999", placeholder: "x"}); // -> (4xx) xxx-xxxx
```

#### Undoing a mask

``` javascript
var el = document.querySelector("input")
VMasker(el).maskPattern("(99) 9999-9999"); // masking the input
VMasker(el).unMask(); // unmask!
```

#### Dynamic mask

Sometimes you need swap the mask according with value.
You can see the sample below on [codepen.io](http://codepen.io/lagden/pen/meemqG)

```javascript
function inputHandler(masks, max, event) {
  var c = event.target;
  var v = c.value.replace(/\D/g, '');
  var m = c.value.length > max ? 1 : 0;
  VMasker(c).unMask();
  VMasker(c).maskPattern(masks[m]);
  c.value = VMasker.toPattern(v, masks[m]);
}

var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
var tel = document.querySelector('#tel');
VMasker(tel).maskPattern(telMask[0]);
tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);

var docMask = ['999.999.999-999', '99.999.999/9999-99'];
var doc = document.querySelector('#doc');
VMasker(doc).maskPattern(docMask[0]);
doc.addEventListener('input', inputHandler.bind(undefined, docMask, 14), false);
```

### Meteor uses

If your app is built on top of Meteor framework, you can use the lib in this way...

``` html
<body>
  <h1>Welcome to Meteor!</h1>
  {{> myTemplate}}
</body>

<template name="myTemplate">
  <input type="text" placeholder="Money" data-vm-mask-money>
  <input type="text" placeholder="Number" data-vm-mask-number>
  <input type="text" placeholder="Date" data-vm-mask-date>
</template>

```

You just need to bind the elements into the template `rendered` function...

``` javascript
if (Meteor.isClient) {
  Template.myTemplate.rendered = function() {
    VMasker(this.find("[data-vm-mask-money]")).maskMoney();
    VMasker(this.find("[data-vm-mask-number]")).maskNumber();
    VMasker(this.find("[data-vm-mask-date]")).maskPattern("99/99/9999");
  };
}
```

# How to run localhost

* Install node.js - http://nodejs.org/download
* Clone this repository - `git clone git@github.com:Creditas/vanilla-masker.git`
* Install Grunt - `npm install -g grunt-cli`
* Install Grunt dependencies - `cd vanilla-masker && npm install`
* Running development mode - `grunt dev`
* Open the browser - http://localhost:4500

# Run test

* Run the command: `grunt test`

# Build project

* Run the command: `grunt build`

# TODO - we need pull requests :]

* Test Opera mini browser;
* Beautify Demo Page;
* Bind mask using `data-vm` attributes;

# Compatibility

Desktop browsers:

* Chrome 4.0+
* Firefox 2.0+
* Safari 4.0+
* Opera 10.0+
* Internet Explorer 8+

Mobile browsers:

* Android browser 2.2+
* Chrome mobile 35.0+
* Firefox mobile 29.0+
* Opera mobile 10.0+
* iOS Safari 3.2+
* Windows Phone browsers

# Contributors

Caio Ribeiro Pereira - caio.ribeiro.pereira@gmail.com
Leandro Alvares da Costa - leandroadacosta@gmail.com
Bobby - squidz.bee@gmail.com
Henrique Antonini Silvério - contato@henriquesilverio.com
Joilson Marques - joilsonmarques@gmail.com
Leonardo Andrade - leonardopandrade@gmail.com
Thiago Lagden - lagden@gmail.com

# Changelog

## 1.1.1 - 16/02/2017

* Fixed gz output file
* Converted package.json dependencies into devDependencies

## 1.1.0 - 13/08/2015

* Improved demo page layout - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/40)
* Fixed bower.json - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/43)
* When backspace is pressed the pattern is kept - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/47)
* Enabled sauce-labs on Travis - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/44)

## 1.0.9 - 07/04/2015

* Added optional placeholder feature for patterns - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/35)

## 1.0.8 - 27/01/2015

* Bug fix #29 - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/29)

## 1.0.7 - 26/01/2015

* Bug fix #28 - [See this issue](https://github.com/Creditas/vanilla-masker/issues/28)

## 1.0.6 - 19/12/2014

* Bug fix #26 - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/26)
* Bug fix #24 - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/24)

## 1.0.5 - 06/12/2014

* Bug fix - [See this pull request](https://github.com/Creditas/vanilla-masker/pull/19)

## 1.0.4 - 02/12/2014

* Added `unbindElementToMask()` function.
* Added `unMask()` function.

## 1.0.3 - 29/10/2014

* Added pattern "S" to support alphanumerics.

## 1.0.2 - 25/09/2014

* Added Meteor Package support.

## 1.0.1 - 19/09/2014

* Fix VMasker factory when element is empty array.

## 1.0.0 - 14/09/2014

* Added VMasker factory as default.
* Fix Windows Phone compatibility.

## 0.3.3

* Fix ignore setSelectionRange cursor for IE8.
* Fix ZeroCents behavior for maskMoney.
* Fix last output state for single element.
* Fix Bower main file.

## 0.3.2

* Added suffixUnit support for maskMoney.

## 0.3.1

* Fix mask when input has values.
* Fix cursor navigation.
* Fix delete char at specific position.

## 0.3.0

* Accepting elements from mask function
* Changed maskPhone, maskCPF, maskCNPJ and maskDate to maskPattern function
* Added toPattern function
* Fixed maskPattern when types pattern "A" in a mask which has only pattern "9"
* Internet Explorer 8 support
* Added AMD support (only client-side)
* maskNumber function accepts negative numbers

## 0.2.0

* Added zeroCents to maskMoney function
* Added maskPhone, maskCPF, maskCNPJ and maskDate function
* Added bindElementToMask function

## 0.1.0

* Added maskMoney
* Added Bower support
* Added Demo page
* Added JSHint
* Mobile browser support
* Added Grunt build
* Added Travis-CI
* Added CodeClimate

# License

MIT License: http://bankfacil.mit-license.org

# Powered by

Creditas: http://www.creditas.com.br
Join our team! Check our [open positions](https://creditas.recruiterbox.com/)
