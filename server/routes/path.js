/**
 * File: path.js
 * Date: Sep 11, 2015 15:05:43
 * Desc: This file generates a UI based on the contents of a folder.
 * Auth: Cezary Wojcik
 */

exports.path = function(req, res) {
  res.render("folder", {
    title: "Sample Folder Title",
    items: [
      {
        title: "Item 1",
        content: "Content 1"
      },
      {
        title: "Item 2",
        content: "Content 2"
      }
    ]
  });
};

