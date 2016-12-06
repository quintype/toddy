var React = require("react");
var ReactDomServer = require("react-dom/server");

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
  return ReactDomServer.renderToString(React.createElement(Root, opts));
};
