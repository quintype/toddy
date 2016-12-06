var React = require("react");
var _ = require("lodash");

function makeLinksOpenNewTab(e) {
  var host = global.location.host;
  $(e.getElementsByTagName("a")).each(function() {
    var href = $(this).attr("href");
    // Fix for empty A tags: <a></a>
    if (href) {
      var linkRel = href.indexOf(host) == -1 ? "external" : "bookmark";
      $(this).attr("rel", linkRel);
      $(this).attr("href", encode(href));
    }
  });

  $(e).on("click", "a", function() {
    var href = $(this).attr("href");
    if (href.indexOf(host) == -1) {
      global.open(href, "_blank");
      return false;
    } else {
      return true;
    }
  });
}

function encode(url) {
  return url.replace("&amp;", "&").replace("&", "&amp;");
}

var DangerousTag = function(tagString) {
  return React.createClass({
    getInitialState: function() {
      return {ref: _.uniqueId()};
    },
    componentDidMount: function() {
      makeLinksOpenNewTab(this.refs[this.state.ref]);
    },
    render: function() {
      var props = _.assign({}, this.props, {ref: this.state.ref});
      return React.createElement(tagString, props);
    }
  });
};

module.exports = DangerousTag;
