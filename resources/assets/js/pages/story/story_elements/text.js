var React = require('react');

class TextCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textElement: this.props.storyElement
    }
  }

  render() {
    return require("./text.rt").call(this);
  }
};

module.exports = TextCard;
