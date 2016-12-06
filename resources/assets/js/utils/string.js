var sanitizer = require("sanitizer"),
    _       = require("lodash");

var onlyKeepPlainText = sanitizer.makeSaxParser({
  pcdata: function(data, x) {
    return x.push(data);
  }
});

var parser = function(opts) {
  return function(html) {
    var a = [];
    opts(html, a);
    return a.join("");
  };
};

var formatAsName=function(strArray){
  if(strArray.length==1) return strArray[0];
  var lastWord= _.last(strArray);
  return(_.dropRight(strArray,1).join(", ")+ " & "+lastWord);
};

var utils = {
  stripHTML: parser(onlyKeepPlainText),

  utf8ToBase64: function(str) {
    return global.btoa(unescape(encodeURIComponent(str)));
  },

  base64ToUtf8: function(str) {
    return decodeURIComponent(escape(global.atob(str)));
  },

  //needs a better name, also probably should not be here
  formatStoryAuthors: function(story){
    var authors=story.authors|| [{name: story["author-name"]}];
    var authorNames= _.map(authors, function(a){return a.name});
    return(formatAsName(authorNames));
  }
};

module.exports = utils;
