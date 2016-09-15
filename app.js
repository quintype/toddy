var express = require('express');
var app = express();

var client = require("./app/client");

var sketchesProxy = require("./app/sketches-proxy");

var serverSideRender = require("./app/server-side-render");

var layout = require("./app/layout");

app.use(express.static("public"));

app.get("/ping", function(req, res) {
  if(client.getConfig())
    res.send("pong")
  else
    res.status(503).send({error: {message: "Config not loaded"}});
});

app.all("/api/*", sketchesProxy);
app.all("/login", sketchesProxy);
app.all("/qlitics.js", sketchesProxy);
app.all("/auth.form", sketchesProxy);
app.all("/auth.callback", sketchesProxy);
app.all("/auth", sketchesProxy);
app.all("/admin/*", sketchesProxy);
app.all("/sitemap", sketchesProxy);
app.all("/feed", sketchesProxy);
app.all("/rss-feed", sketchesProxy);
app.all("/stories.rss", sketchesProxy);
app.all("/news_sitemap.xml", sketchesProxy);

app.get('/', function (req, res) {
  var js = "app.homePage(" + JSON.stringify({foobar: "World!"}) + ")";
  res.send(layout({title: "Sample App", content: serverSideRender(js), js: js}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
