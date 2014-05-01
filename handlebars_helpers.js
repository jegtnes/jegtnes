// Dear Future Alex:
// This was taken from:
// https://ghost.org/forum/using-ghost/1773-custom-handlebars-helper/
// So you know what the heck you're on about.
// Love, Past Alex

var hbs = require('express-hbs');
var config = require('config');
registerHelper = function (){
  hbs.registerHelper("isLocal", function(url) {
    return url === config.development.url
  });
}

module.exports = registerHelper;
