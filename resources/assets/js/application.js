var React = require("react");
var ReactDom = require("react-dom");

global.app = global.app || {};

global.atob = function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
};

global.btoa = function btoa(str) {
  var buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'binary');
  }

  return buffer.toString('base64');
};

var Root = require("./pages/root");
app.render = function(opts) {
  ReactDom.render(React.createElement(Root, opts), document.getElementById("container"));
};

app.initQtReady = require("./qt_ready");
app.initQtReady();
