var vm = require("vm");
var fs = require("fs");

function createContext() {
  var context = {
    console: {error: function(){}, log: function(){}, warn: function(){}},
    setTimeout: function() {return 0;}
  };
  context.global = context.window = context;
  var sandbox = vm.createContext(context);

  var script = vm.createScript(fs.readFileSync("resources/server.js"), "resources/server.js");
  script.runInContext(context);
  return context;
}

var context = createContext();

function execute(script) {
  var script = vm.createScript(script, "script.js");
  return script.runInContext(context);
}

module.exports = execute;
