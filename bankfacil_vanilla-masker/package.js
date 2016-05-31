Package.describe({
  summary: "VanillaMasker is a pure javascript input mask.",
  version: "1.0.9",
  git: "https://github.com/BankFacil/vanilla-masker"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.1.0.2');
  api.addFiles('../lib/vanilla-masker.js');
});
