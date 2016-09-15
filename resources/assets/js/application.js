var React = require("react");
var ReactDom = require("react-dom");

global.app = global.app || {};

var Root = require("./pages/root");
app.render = function(opts) {
  ReactDom.render(React.createElement(Root, opts), document.getElementById("container"));
};

app.initQtReady = require("./qt_ready");
app.initQtReady();
