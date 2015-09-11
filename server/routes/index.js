/**
 * File: index.js
 * Date: Sep 11, 2015 10:44:22
 * Desc: Loads all other *.js files in this directory. 
 * Auth: Cezary Wojcik
 */


var fs = require("fs");

fs.readdirSync(__dirname).forEach(function(file) {
  var moduleName = file.split(".")[0];
  exports[moduleName] = require("./" + file)[moduleName];
});

