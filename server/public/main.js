/**
 * File: main.js
 * Date: Sep 11, 2015 10:36:26
 * Desc: The main JavaScript file for CWFileExplorer.
 * Auth: Cezary Wojcik
 */

function getDocument(url) {
  var templateXHR = new XMLHttpRequest();
  templateXHR.responseType = "document";
  templateXHR.addEventListener("load", function() {pushDoc(templateXHR.responseXML);}, false);
  templateXHR.open("GET", url, true);
  templateXHR.send();
  return templateXHR;
}
 
function pushDoc(document) {
  navigationDocument.pushDocument(document);
}
 
App.onLaunch = function(options) {
  var templateURL = "http://localhost:3000/";
  getDocument(templateURL);
}
 
App.onExit = function() {
  console.log('App finished');
}

