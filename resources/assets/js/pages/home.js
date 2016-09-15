var React = require('react');

var HomePage = React.createClass({
  getInitialState: function() {
    return {
      count: 0
    };
  },

  render: require("./home.rt"),

  componentDidMount: function() {
    var self = this;
    this.interval = global.setInterval(function() {
      self.setState({count: self.state.count + 1});
    }, 1000)
  }
});

module.exports = HomePage;
