var express = require('express');
var app = express();

var _ = require("lodash");

var client = require("./app/client");

var sketchesProxy = require("./app/sketches-proxy");
var serverSideRender = require("./app/server-side-render");

var layout = require("./app/layout");

var Promise = require("bluebird");

function withLayout(f) {
  return function(req, res) {
    var config = client.getConfig();

    f(req, res, {config: config})
      .then(result => {
	if(!res.finished) {
	  res.send(layout(_.extend({
	    title: "Sample App",
	    config: config
	  }, result)));
	}
      }).catch(function(e) {
	res.status(500);
	console.log(e);
      }).finally(() => res.end());
  };
}


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

app.get('/', withLayout(() => {
  var js = "app.render(" + JSON.stringify({page: 'home', args: {stories: []}}) + ")";
  return new Promise((resolve) => resolve({
    title: "Sample App",
    content: serverSideRender(js),
    js: js
  }));
}));

app.get("/shell.html", withLayout(() => {
  return new Promise((resolve) => resolve({
    title: "Sample App",
    content: ""
  }));
}));

var serviceWorkerJs = require("./app/render-service-worker");
app.get("/service-worker.js", function(req, res) {
  res.status(200)
    .set("Content-Type", "text/javascript")
    .send(serviceWorkerJs({
      origin: `${req.protocol}://${req.get('host')}`
    }));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
