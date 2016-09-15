var React = require('react');

var superagent = require("superagent");

var emptyGif = require("empty-web-gif");
var Quintype = require("quintype-js");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: this.props.stories
    };
  }

  componentDidMount() {
    superagent.get("/api/v1/stories")
      .end((err, res) => this.setState({
	stories: err ? [] : res.body.stories
      }));
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
