var compression = require('compression');
var express = require('express');
var app = express();

var _ = require("lodash");

var client = require("./app/client");

var sketchesProxy = require("./app/sketches-proxy");
var serverSideRender = require("./app/server-side-render");
var {HomeSeo} = require('quintype-seo-node');
var {Story} = require('quintype-backend');
var layout = require("./app/layout");
var robots = require("./app/robots");

var Promise = require("bluebird");

function withLayout(f) {
  return function(req, res) {
    var config;
    
    client.getConfig()
      .then(_config => config = _config)
      .then(() => f(req, res, {config: config}))
      .then(result => {
        if(!res.finished) {
          res.send(layout(_.extend({
            title: "Sample App",
            config: config
          }, result)));
        }
      })
      .catch(function(e) {
        res.status(500);
        console.log(Date(Date.now()));
        console.log(e);
      })
      .finally(() => res.end());
  };
}

app.use(express.static("public"));
app.use(compression());

app.get("/ping", function(req, res) {
  client
  .getConfig()
  .then(() => res.send("pong"))
  .catch(() =>
    res
    .status(503)
    .send({error: {message: "Config not loaded"}})
  );
});

app.all("/api/*", sketchesProxy);
app.all("/login", sketchesProxy);
app.all("/qlitics.js", sketchesProxy);
app.all("/auth.form", sketchesProxy);
app.all("/auth.callback", sketchesProxy);
app.all("/auth", sketchesProxy);
app.all("/admin/*", sketchesProxy);
app.all("/sitemap.xml", sketchesProxy);
app.all("/sitemap/*", sketchesProxy);
app.all("/feed", sketchesProxy);
app.all("/rss-feed", sketchesProxy);
app.all("/stories.rss", sketchesProxy);
app.all("/news_sitemap.xml", sketchesProxy);

app.get("/robots.txt", function(req, res) {
  res.setHeader("Content-Type", "text/plain")
  res.end(robots(req));
});

app.get('/', withLayout((req, res, {config}) => {
  var homeSeo = new HomeSeo(client.getConfig);
  var js = "app.render(" + JSON.stringify({page: 'home', args: {stories: []}}) + ")";
  return new Promise((resolve) => resolve({
    title: "Sample App",
    content: serverSideRender(config, js),
    js: js,
    seoTags: homeSeo.getMetaTags()
  }));
}));

// story page route
app.get('/:section/:yyyy/:mm/:dd/:slug', withLayout((req, res, {config}) => {
  return Story
        .getStoryBySlug(client, req.params.slug)
        .then(_story => {
          var storyJson = _story.asJson(),
              js = "app.render(" + JSON.stringify({page: 'story', args: {story: storyJson, config: config}}) + ")";
          return {
            title: storyJson["headline"],
            content: serverSideRender(config, js),
            js: js
          }
        });
}));

// redirect this route to story page
// when google crawls this page ideally it should go to story page
// expected behaviour right now date:28/November/2016
app.get('/story/:storyId/element/:elementId', withLayout((req, res, {config}) => {
  return Story
        .getStoryById(client, req.params.storyId)
        .then(_story => {
          var storyJson = _story.asJson();
          return res.redirect(301, config['sketches-host'] + "/" + storyJson['slug'])
        });
}));

module.exports = function startApp() {
  return client.getConfig()
  .then(function() {
     app.listen(3000, function () {
       console.log('Example app listening on port 3000!');
     });
  });
}
