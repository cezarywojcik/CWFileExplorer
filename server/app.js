/**
 * File: app.js
 * Date: Sep 11, 2015 10:23:20
 * Desc: The main file for the CWFileExplorer server.
 * Auth: Cezary Wojcik
 */

// ---- [ includes ] -----------------------------------------------------------

var express = require("express");
var bodyParser = require("body-parser");
var jade = require("jade");
var routes = require("./routes");

// ---- [ setup ] --------------------------------------------------------------

var app = express();
app.engine("jade", jade.__express);
app.set("view engine", "jade");
app.set("view options", {
    layout: false
});
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());

// ---- [ routing ] ------------------------------------------------------------

app.get("/", routes.home);

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(3000, function() {
  console.log("server running");
});
