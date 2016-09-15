var React = require('react');

var HomePage = React.createClass({
  getInitialState: function() {
    return {
      stories: this.props.stories
    };
  },

  render: require("./home.rt"),
});

module.exports = HomePage;
