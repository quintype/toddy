var React = require('react');

var storyElements = require('./story_elements/story_elements_reference');

class StoryElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storyElement: this.props.storyElement,
      storyElementType: this.props.storyElement['type'],
      isStoryElementSubType: Boolean(this.props.storyElement['subtype'])
    }
  }

  render() {
    return React.createElement(storyElements[this.state.storyElementType], {storyElement: this.state.storyElement})
  }
}

module.exports = StoryElement;
