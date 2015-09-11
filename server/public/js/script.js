(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  var templateURL = "http://localhost:3000/";
  loadDocument(templateURL, function() {
    alert("Document List", navigationDocument.documents, function() {
      navigationDocument.dismissModal();
    });
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


},{}]},{},[1]);
