var React = require('react');

var HomePage = React.createClass({
  getInitialState: function() {
    return {
      count: 0
    };
  },

  render: function() {
    return React.createElement("div", {}, "Hello, " + this.props.foobar + " " + this.state.count);
  },

  componentDidMount: function() {
    var self = this;
    this.interval = global.setInterval(function() {
      self.setState({count: self.state.count + 1});
    }, 1000)
  }
});

module.exports = HomePage;