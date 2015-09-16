/**
 * File: main.js
 * Date: Sep 11, 2015 11:01:46
 * Desc: The main JavaScript file for CWFileExplorer. 
 * Auth: Cezary Wojcik
 */

var settings = {
  defaultPath: "/",
  serverUrl: "http://localhost",
  port: 3000
};


// ---- [ helper functions ] ---------------------------------------------------

function alert(title, description) {
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
  alertDOMElement.addEventListener("select", function() {
    navigationDocument.dismissModal();
  }, false);
  navigationDocument.presentModal(alertDOMElement);
}

function loadDocument(url, completion) {
  var templateXHR = new XMLHttpRequest();
  templateXHR.responseType = "document";
  templateXHR.addEventListener("load", function() {
    if (navigationDocument.documents.length === 0) {
      navigationDocument.pushDocument(templateXHR.responseXML);
    } else {
      navigationDocument.replaceDocument(templateXHR.responseXML,
        navigationDocument.documents[0]);
    }
    completion();
  }, false);
  templateXHR.open("GET", url, true);
  templateXHR.send();
  return templateXHR;
}

function loadUIForPath(path, completion) {
  var url = settings.serverUrl + ":" + settings.port + "/ui/path" 
    + encodeURI(path);
  loadDocument(url, function() {
    navigationDocument.documents[0].addEventListener("select", 
      listItemSelected, false);
  });
}

function listItemSelected(event) {
  var el = event.target;
  var type = el.getAttribute("type");
  switch (type) {
    case "Directory":
      var path = el.getAttribute("path");
      loadUIForPath(path);
      break;
    default:
      alert("Huzzah!", type);
  }
}

// ---- [ App functions ] ------------------------------------------------------

App.onLaunch = function(options) {
  loadUIForPath(settings.defaultPath);
}
 
App.onExit = function() {
  console.log("App finished");
}

