var React =  require('react');

class StoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      story: this.props.story
    }
  }

  render() {
    return require("./story.rt").call(this);
  }
};

module.exports = StoryPage;
