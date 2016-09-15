var React = require("react");
var ReactDomServer = require("react-dom/server");

global.app = global.app || {};

var Root = require("./pages/root");
app.render = function(opts) {
  return ReactDomServer.renderToString(React.createElement(Root, opts));
};
