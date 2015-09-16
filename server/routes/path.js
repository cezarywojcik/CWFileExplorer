/**
 * File: path.js
 * Date: Sep 11, 2015 15:05:43
 * Desc: This file generates a UI based on the contents of a folder.
 * Auth: Cezary Wojcik
 */

var fs = require("fs");

exports.path = function(req, res) {
  var path = "/" + req.params.path;
  fs.readdir(path, function(err, files) {
    var items = [];

    // add parent directory
    var parentPath = path.split("/");
    parentPath.pop();
    parentPath = parentPath.length === 1 ? "/" : parentPath.join("/");
    if (path != "/") {
      items.push({
        title: "..",
        type: "Directory",
        image: "",
        path: parentPath 
      });
    }

    // make sure path ends in slash
    if (path.slice(-1) !== "/") {
      path += "/";
    }

    // list items in folder
    for (var i in files) {
      var item = {};
      item.title = files[i];
      var fullPath = path + files[i]
      var stats = fs.lstatSync(fullPath);
      // show file type
      item.type= stats.isFile() ? "File" :
        stats.isDirectory() ? "Directory" :
        stats.isBlockDevice() ? "Block Device" :
        "Other";
      item.image = "file://" + fullPath;
      item.path = fullPath;
      items.push(item);
    }
    res.render("folder", {
      title: path,
      items: items 
    });
  });
 };

