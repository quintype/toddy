var express = require('express');
var app = express();

var config = require("./app/config");
config.init();

var sketchesProxy = require("./app/sketches-proxy");

var React = require("react");
var ReactDomServer = require("react-dom/server");

var layout = require("./app/layout");

app.use(express.static("public"));

app.get("/ping", function(req, res) {
  if(config.site)
    res.send("pong")
  else
    res.status(503).send({error: {message: "Config not loaded"}});
});

app.all("/api/*", sketchesProxy);

var HomePage = require("./resources/assets/js/pages/home.js");
app.get('/', function (req, res) {
  var html = ReactDomServer.renderToString(React.createElement(HomePage, {foobar: "World!"}));
  var js = "app.homePage(" + JSON.stringify({foobar: "World!"}) + ")";
  res.send(layout({title: "Sample App", content: html, js: js}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
