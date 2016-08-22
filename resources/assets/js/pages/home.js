var React = require('react');

var HomePage = React.createClass({
  render: function() {
    return React.createElement("div", {}, "Hello, " + this.props.foobar);
  }
});

module.exports = HomePage;