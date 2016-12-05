var React = require('react');

class StoryElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storyElement: this.props.storyElement,
      storyElementType: this.props.storyElement['type']
    }
  }

  render() {
    return React.createElement(require(`./story_elements/${this.state.storyElementType}`),
     {storyElement: this.state.storyElement})
  }
}

module.exports = StoryElement;
