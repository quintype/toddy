var React =  require("React");

var Quintype = require("quintype-js");

class HeaderCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      story: this.props.story
    }
  }

  focusedImageUrl(story, config) {
    var image_path = new Quintype.FocusedImage(story["hero-image-s3-key"], story["hero-image-metadata"])
                                 .path([16, 9], {w: 640, fmt: 'pjpg', auto: 'compress'});
    return `//${config['cdn-image']}/${image_path}`;
  }

  render() {
    return require("./header_card.rt").call(this);
  }
};

module.exports = HeaderCard;
