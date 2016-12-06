var React = require("react");
var _ = require("lodash");

var ROOT_COMPONENTS = {
  home: require("./home/home"),
  story: require("./story/story")
};

class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      args: props.args,
      counter: 0
    }
  }

  changePage(page, args) {
    this.setState({
      page: page,
      args: args,
      counter: this.state.counter + 1
    });
  }

  render() {
    return React.createElement(ROOT_COMPONENTS[this.state.page], _.extend({
      changePage: this.changePage,
      key: this.state.counter
    }, this.state.args));
  }
};

module.exports = RootComponent;
