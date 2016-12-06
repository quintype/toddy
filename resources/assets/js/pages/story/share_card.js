var React  =  require("React");

class ShareCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      story: this.props.story
    }
  }

  getShareUrl(story) {
    return app.config['sketches-host'] + story.slug;
  }

  getUrlEncodedHeadline(story) {
    return encodeURIComponent(story['headline'].trim());
  }

  render() {
    return require("./share_card.rt").call(this);
  }
}

module.exports = ShareCard;
