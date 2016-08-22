var app = app || {};

app.homePage = function(opts) {
  var HomePage = require("./pages/home");
  ReactDom.render(document.getElementById("container"), React.createElement(HomePage, opts));
};