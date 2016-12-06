var React = require('react');

class StoryCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      card: this.props.card
    }
  }

  render() {
    return require("./card.rt").call(this);
  }
};

module.exports = StoryCard;
