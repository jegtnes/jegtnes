// # Ghost bootloader
// Orchestrates the loading of Ghost
// When run from command line.

var ghost = require('./core'),
    hbs_helpers = require('./handlebarsHelpers'),
    errors = require('./core/server/errorHandling');

ghost().otherwise(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});

hbs_helpers();
