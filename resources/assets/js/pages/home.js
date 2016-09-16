var React = require('react');

var superagent = require("superagent");

var emptyGif = require("empty-web-gif");
var Quintype = require("quintype-js");

function fetchFromCache(url, ajaxQuery, callback) {
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response) {
	response.json().then(function(json) {
          callback(null, {body: json});
	  ajaxQuery().end(callback);
	});
      } else {
	ajaxQuery().end(callback);
      }
    });
  } else {
    ajaxQuery().end(callback);
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: this.props.stories
    };
  }

  updateStories(err, res) {
    if(!err)
      this.setState({
	stories: res.body.stories
      });
  }

  componentDidMount() {
    fetchFromCache("/api/v1/stories",
		   () => superagent.get("/api/v1/stories"),
		   (err, res) => this.updateStories(err, res));
  }

  imagePath(story) {
    if(!story["hero-image-s3-key"])
      return emptyGif;

    var image_path = new Quintype.FocusedImage(story["hero-image-s3-key"], story["hero-image-metadata"]).path([16, 9], {w: 640, fmt: 'pjpg', auto: 'compress'});
    return `//quintype-01.imgix.net/${image_path}`;
  }

  render() {
    return require("./home.rt").call(this);
  }
};

module.exports = HomePage;
