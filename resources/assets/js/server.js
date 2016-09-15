var React = require("react");
var ReactDomServer = require("react-dom/server");

global.app = global.app || {};

app.homePage = function(opts) {
  var HomePage = require("./pages/home");
  return ReactDomServer.renderToString(React.createElement(HomePage, opts));
};
