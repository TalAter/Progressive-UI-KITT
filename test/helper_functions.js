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

var getMessages = function() {
  return $('.progressivekitt-message');
};

var getLatestMessage = function() {
  return getMessages().last();
};

var getLatestMessageButtons = function() {
  return $('span.progressivekitt-button', getLatestMessage());
};

var simulateClick = function(element) {
  var event = document.createEvent("MouseEvents");
  event.initEvent("click", true, false);
  return element.dispatchEvent(event);
};