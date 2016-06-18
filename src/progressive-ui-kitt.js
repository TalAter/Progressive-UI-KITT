/*
<!--
Progressive UI KITT
version : 0.0.1
author  : Tal Ater @TalAter
license : MIT
https://github.com/TalAter/Progressive-UI-KITT
-->
*/

"use strict";

var _stylesheet;
var _stylesheetNode;
var _guiNodes;
var _debugState = false;
var _debugStyle = 'font-weight: bold; color: #00f;';
var _messages = [];
var _listenersRegistered = false;

// method for logging to the console if debug mode is on
var _logMessage = function(text, extraParameters) {
  if (!_debugState) {
    return;
  }
  if (text.indexOf('%c') === -1 && !extraParameters) {
    console.log(text);
  } else {
    extraParameters = extraParameters || _debugStyle;
    console.log(text, extraParameters);
  }
};

// Checks if GUI was already created
var _guiCreated = function () {
  return _guiNodes !== undefined;
};

// Attach a style sheet if GUI already attached, if already attached, update it's href
var _updateStylesheet = function() {
  if (_stylesheet && _guiCreated()) {
    if (_stylesheetNode) {
      _stylesheetNode.href = _stylesheet;
    } else {
      _stylesheetNode = document.createElement('link');
      _stylesheetNode.rel = 'stylesheet';
      _stylesheetNode.href = _stylesheet;
      _stylesheetNode.id = 'progressivekitt-style-sheet';
      document.body.appendChild(_stylesheetNode);
    }
  }
};

// Called once to generate the GUI nodes
var _createGUI = function() {
  // create GUI
  _guiNodes = document.createElement('div');
  _guiNodes.id = 'progressivekitt-ui';
  _guiNodes.innerHTML = '';
  _guiNodes.style.display = 'none';
  document.body.appendChild(_guiNodes);

  _updateStylesheet();
};

// Adds a new message and draws it
var _addMessage = function(contents, options) {
  if (!_guiCreated()) {
    return;
  }
  if (typeof contents !== 'string') {
    return;
  }
  options = options || {};
  if (typeof options !== 'object') {
    _logMessage('Invalid options object');
  }

  var messageId = _messages.length+Date.now();

  var newMessageNode = document.createElement('div');
  newMessageNode.id = 'progressivekitt-message-'+messageId;
  newMessageNode.innerHTML = contents;
  newMessageNode.classList.add('progressivekitt-message');

  var newMessage = {
    id: messageId,
    contents: contents
  };

  _messages.push(newMessage);

  _guiNodes.appendChild(newMessageNode);

  setTimeout(function() {
    newMessageNode.classList.add('progressivekitt-message--shown');
  }, 1);

  if (isFinite(options.hideAfter) && options.hideAfter > 0) {
    setTimeout(function() {
      newMessageNode.classList.remove('progressivekitt-message--shown');
      setTimeout(function() {
        // @TODO: Refactor to _deleteMessage method
        if (newMessageNode && newMessageNode.parentNode) {
          newMessageNode.parentNode.removeChild(newMessageNode);
        }
      }, 1000);
    }, options.hideAfter);
  }

  return messageId;
};

// A listener used to parse messages posted from the service worker
var _messageListener = function(event) {
  if (typeof event.data === 'object' && event.data.action === 'pkitt-message') {
    _addMessage(event.data.msg);
  }
};

// Register event listener for messages posted from the service worker
var _registerListeners = function() {
  if (_listenersRegistered) {
    return;
  }
  if('serviceWorker' in navigator){
    navigator.serviceWorker.addEventListener('message', _messageListener);
    _listenersRegistered = true;
  }
};

var _deleteMessageFromDOM = function(msgID) {
  var node = document.getElementById('progressivekitt-message-'+msgID);
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
};

/**
 * Call after configuring KITT, to render its interface.
 *
 * Identical to calling `ProgressiveKITT.render();` but less magical.
 *
 * @method vroom
 * @see [render()](#render)
 */
var vroom = function() {
  this.render();
};


/**
 * Call after configuring KITT, to render its interface.
 *
 * @method render
 */
var render = function() {
  _registerListeners();

  if (!_guiCreated()) {
    _createGUI();
  }
};


/**
 * Set the URL for the stylesheet for the UI
 *
 * If a stylesheet was previously set, calling this again will update the
 * interface with a new stylesheet (if the interface was already rendered,
 * it will be updated)
 *
 * @param string stylesheet relative or absolute url to the stylesheet
 * @method setStylesheet
 */
var setStylesheet = function(stylesheet) {
  _stylesheet = stylesheet;
  _updateStylesheet();
};

/**
 * Deletes all existing messages from KITT and removes them from the DOM
 *
 * @method deleteMessages
 */
var deleteMessages = function() {
  var message;
  while ((message = _messages.shift()) !== undefined) {
    _deleteMessageFromDOM(message.id);
  }
};

/**
 * Deletes a single message from KITT and removes it from the DOM
 *
 * @param msgID
 * @method deleteMessage
 */
var deleteMessage = function(msgID) {
  var messagesLength = _messages.length;
  // Remove from array of messages
  _messages = _messages.filter(function(message) {
    return message.id !== msgID;
  });
  // If message id was not found, log a notice to console.
  if (messagesLength === _messages.length) {
    _logMessage('deleteMessage() did not find the message with the id', msgID);
    return;
  }
  _deleteMessageFromDOM(msgID);
};



/**
 * Draws a new message to the GUI
 *
 * @param string contents The contents of the message (text or HTML)
 * @param Object options Options for this message
 * @method addMessage
 */
var addMessage = function(contents, options) {
  // @TODO: Add settings objects details in doc
  return _addMessage(contents, options);
};

/**
 * Call to hide the GUI.
 *
 * Interface must have been previously rendered with render()
 *
 * @method hide
 */
var hide = function() {
  if (!_guiCreated()) {
    _logMessage('cannot hide interface. Must be rendered first');
  }
  _guiNodes.classList.add('progressivekitt-ui--hidden');
};

/**
 * Call to show the GUI if it has been hidden with hide()
 *
 * Interface must have been previously rendered with render()
 *
 * @method show
 */
var show = function() {
  if (!_guiCreated()) {
    _logMessage('cannot show interface. Must be rendered first');
  }
  _guiNodes.classList.remove('progressivekitt-ui--hidden');
};

/**
 * Turn output of debug messages to the console on or off.
 *
 * * Debug is off by default.
 * * Calling with no arguments will turn debug on.
 *
 * Examples:
 * ````javascript
 * ProgressiveKITT.debug();       // turns debug messages on
 * ProgressiveKITT.debug(true);   // turns debug messages on
 * ProgressiveKITT.debug(false);  // turns debug messages off
 * ````
 *
 * @param {boolean} [newState=true] - Turn on/off debug messages
 * @method debug
 */
var debug = function(newState) {
  if (arguments.length > 0) {
    _debugState = !!newState;
  } else {
    _debugState = true;
  }
};


module.exports = {
  setStylesheet:    setStylesheet,
  vroom:            vroom,
  render:           render,
  addMessage:       addMessage,
  deleteMessages:   deleteMessages,
  deleteMessage:    deleteMessage,
  show:             show,
  hide:             hide,
  debug:            debug
};
