var fs = require("fs");
var yaml = require("js-yaml");

var publisherConfig = yaml.safeLoad(fs.readFileSync("config/publisher.yml"));

module.exports = {
  publisher: publisherConfig
};
