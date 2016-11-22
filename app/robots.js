var fs = require("fs");
var config = require("./publisher-config");

var Handlebars = require("handlebars");
var layout = Handlebars.compile(fs.readFileSync("resources/views/robots.handlebars", {encoding: 'utf8'}));

function robots(req) {
  return layout({host: req.headers.host});
}

module.exports = robots;
