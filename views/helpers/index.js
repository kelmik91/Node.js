const handlebars = require('handlebars');

module.exports = function register() {
    handlebars.registerHelper('not', val => !val);
}
