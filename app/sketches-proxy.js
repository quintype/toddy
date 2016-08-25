var config = require("./config");

var sketchesHost = config["sketches-host"];
var httpHost = sketchesHost.replace(/https?:\/\//, "");

var apiProxy = require("http-proxy").createProxyServer({
  target: sketchesHost
});

apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Host', httpHost);
});

function redirectUpstream(req, res) {
  apiProxy.web(req, res);
}

module.exports = redirectUpstream;
