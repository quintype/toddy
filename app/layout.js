var fs = require("fs");
var config = require("./publisher-config");

var Handlebars = require("handlebars");
var layout = Handlebars.compile(fs.readFileSync("resources/views/layout.handlebars", {encoding: 'utf8'}));

var assets = JSON.parse(fs.readFileSync("public/" + config.publisher_name + "/assets/rev-manifest.json"));
function renderLayout(opts) {
  return layout(opts, {
    helpers: {
      assetPath: function(path) {
        return [config.asset_host, config.publisher_name, "assets", assets[path]].join("/");
      },

      toJson: function(obj) {
        return JSON.stringify(obj);
      }
    }
  })
}

module.exports = renderLayout;
