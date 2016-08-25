var fs = require("fs");
var yaml = require("js-yaml");
var superagent = require("superagent");

var config = {
  publisher: yaml.safeLoad(fs.readFileSync("config/publisher.yml")),
  init: startFetching,
  site: null
};

function getConfig() {
  superagent
  .get(config.publisher.sketches_host + "/api/v1/config")
  .end(function(err, res) {
    if(res && res.status == 200) {
      config.site = res.body;
    }
  });
}

function startFetching() {
  getConfig();
  setInterval(getConfig, 120000);
}


module.exports = config;
