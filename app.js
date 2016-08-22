var fs = require("fs");

var Handlebars = require("handlebars");
var layout = Handlebars.compile(fs.readFileSync("app/views/layout.handlebars", {encoding: 'utf8'}));

var express = require('express');
var app = express();

var React = require("react");
var ReactDomServer = require("react-dom/server");

var HomePage = require("./app/assets/javascripts/pages/home.js");
app.get('/', function (req, res) {
  var html = ReactDomServer.renderToString(React.createElement(HomePage, {foobar: "World!"}));
  var js = "app.homePage(" + JSON.stringify({foobar: "World!"}) + ")";
  res.send(layout({title: "Sample App", content: html, js: js}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});