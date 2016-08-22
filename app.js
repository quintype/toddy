var express = require('express');
var app = express();

var fs = require("fs");

var Handlebars = require("handlebars");
var layout = Handlebars.compile(fs.readFileSync("app/views/layout.handlebars", {encoding: 'utf8'}));

app.get('/', function (req, res) {
  res.send(layout({title: "Sample App", content: "Hello, World!"}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});