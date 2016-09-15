var React = require("react");

var Quintype = require("quintype-js");

class StoryPage extends React.Component {
  heroImagePath() {
    var story = this.props.story;

    if(!story["hero-image-s3-key"])
      return emptyGif;

    var image_path = new Quintype.FocusedImage(story["hero-image-s3-key"], story["hero-image-metadata"]).path([16, 9], {w: 640, fmt: 'pjpg', auto: 'compress'});
    return `//quintype-01.imgix.net/${image_path}`;
  }

  render() {
    return require("./story.rt").call(this);
  }
};

module.exports = StoryPage;
