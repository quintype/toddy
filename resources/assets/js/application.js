var React = require("react");
var ReactDom = require("react-dom");

global.app = global.app || {};

app.homePage = function(opts) {
  var HomePage = require("./pages/home");
  ReactDom.render(React.createElement(HomePage, opts), document.getElementById("container"));
};

app.initQtReady = require("./qt_ready");
