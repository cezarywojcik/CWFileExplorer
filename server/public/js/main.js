/**
 * File: main.js
 * Date: Sep 11, 2015 11:01:46
 * Desc: The main JavaScript file for CWFileExplorer. 
 * Auth: Cezary Wojcik
 */

var defaultPath = "/";

function alert(title, description, doneCallback) {
  var alertXMLString = `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <alertTemplate>
      <title>${title}</title>
      <description>${description}</description>
      <button>
        <text>OK</text>
      </button>
    </alertTemplate>
  </document>`
  var parser = new DOMParser();
  var alertDOMElement = parser.parseFromString(alertXMLString, "application/xml");
  alertDOMElement.addEventListener("select", doneCallback, false);
  navigationDocument.presentModal(alertDOMElement);
}

function loadDocument(url, completion) {
  var templateXHR = new XMLHttpRequest();
  templateXHR.responseType = "document";
  templateXHR.addEventListener("load", function() {
    navigationDocument.pushDocument(templateXHR.responseXML);
    completion();
  }, false);
  templateXHR.open("GET", url, true);
  templateXHR.send();
  return templateXHR;
}
 
App.onLaunch = function(options) {
  var templateURL = "http://localhost:3000/ui/path/yolo";
  loadDocument(templateURL, function() {
    var temp = navigationDocument.documents[0].getElementById("button1");
    temp.addEventListener("select", function() {
      alert("Huzzah!", "Success.", function() {
        navigationDocument.dismissModal();
      });
    }, false);
  }); 
}
 
App.onExit = function() {
  console.log("App finished");
}

