var fs = require("fs");
var config = require("./config");

var Handlebars = require("handlebars");
var layout = Handlebars.compile(fs.readFileSync("resources/views/layout.handlebars", {encoding: 'utf8'}));

var assets = JSON.parse(fs.readFileSync("public/toddy/assets/rev-manifest.json"));
function renderLayout(opts) {
  return layout(opts, {
    helpers: {
      assetPath: function(path) {
        return [config["asset-host"], config["publisher-name"], "assets", assets[path]].join("/");
      }
    }
  })
}

module.exports = renderLayout;
