"use strict";

var getWrappers = function() {
  return $('div#progressivekitt-ui');
};

var getWrapper = function() {
  return getWrappers()[0];
};

var getStyleSheets = function() {
  return $('#progressivekitt-style-sheet');
};

var getStyleSheet = function() {
  return getStyleSheets()[0];
};

var simulateClick = function(element) {
  var event = document.createEvent("MouseEvents");
  event.initEvent("click", true, false);
  return element.dispatchEvent(event);
};