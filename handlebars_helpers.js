var hbs = require('express-hbs');
var config = require('config');
registerHelper = function (){
  hbs.registerHelper("isLocal", function(url) {
    return url === config.development.url
  });
}

module.exports = registerHelper;
