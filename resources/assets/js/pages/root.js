var React = require("react");
var _ = require("lodash");

var ROOT_COMPONENTS = {
  home: require("./home")
};

var RootComponent = React.createClass({
  getInitialState: function() {
    return {
      page: this.props.page,
      args: this.props.args,
      counter: 0
    }
  },

  changePage: function(page, args) {
    this.setState({
      page: page,
      args: args,
      counter: this.state.counter + 1
    });
  },

  render: function() {
    return React.createElement(ROOT_COMPONENTS[this.state.page], _.extend({
      changePage: this.changePage,
      key: this.state.counter
    }, this.state.args));
  }
});

module.exports = RootComponent;
