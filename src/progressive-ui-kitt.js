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
var _messages = [];
var _listenersRegistered = false;

// method for logging to the console if debug mode is on
var _logMessage = function(text, extraParameters = 'font-weight: bold; color: #00f;') {
  if (!_debugState) {
    return;
  }
  if (text.indexOf('%c') === -1 && !extraParameters) {
    console.log(text);
  } else {
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
var _addMessage = function(contents, options, ...buttons) {
  // @TODO: Keep message id in a data attribute
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

  // Add buttons to contents if needed
  buttons.forEach((button, buttonId) => {
    if (button) {
      contents += `<span class="progressivekitt-button" id="progressivekitt-button-${buttonId}-${messageId}">${button.label}</span>`;
    }
  });

  var newMessageNode = document.createElement('div');
  newMessageNode.id = `progressivekitt-message-${messageId}`;
  newMessageNode.innerHTML = contents;
  newMessageNode.classList.add('progressivekitt-message');

  var newMessage = {
    id: messageId,
    contents: contents
  };

  _messages.push(newMessage);

  _guiNodes.appendChild(newMessageNode);

  // Add button actions
  buttons.forEach((button, buttonId) => {
    if (button) {
      var buttonCallback = function() {
        if (button.cb) {
          button.cb.apply(button.context);
        }
        ProgressiveKITT.deleteMessage(messageId);
      };
      document.getElementById(`progressivekitt-button-${buttonId}-${messageId}`).addEventListener("click", buttonCallback, false);
    }
  });

  //Delay showing of the message by 20 ms. Helps make sure CSS animations happen consistently.
  setTimeout(() => {
    newMessageNode.classList.add('progressivekitt-message--shown');
  }, 20);

  if (isFinite(options.hideAfter) && options.hideAfter > 0) {
    setTimeout(() => {
      ProgressiveKITT.deleteMessage(messageId);
    }, options.hideAfter);
  }

  return messageId;
};

// A listener used to parse messages posted from the service worker
var _messageListener = function({data: data}) {
  if (typeof data === 'object') {
    var payload = data.payload;
    switch (data.action) {
      case 'pkitt-message':
        ProgressiveKITT.addMessage(payload.contents, payload.options);
        break;
      case 'pkitt-alert':
        ProgressiveKITT.addAlert(payload.contents, payload.buttonLabel, payload.buttonCallback, payload.options, payload.context);
        break;
      case 'pkitt-confirm':
        ProgressiveKITT.addConfirm(payload.contents, payload.button1Label, payload.button1Callback, payload.button2Label, payload.button2Callback, payload.options, payload.context1, payload.context2);
        break;
    }
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
  var node = document.getElementById(`progressivekitt-message-${msgID}`);
  node.classList.remove('progressivekitt-message--shown');
  setTimeout(() => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }, 1000);
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
  _messages = _messages.filter((message) => {
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
 * Draws a message to the GUI
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
 * Draws a message to the GUI with a single button.
 * Defaults: Button is labeled `OK` and dismisses the message.
 *
 * Some examples:
 * ````javascript
 * // Create a simple alert with some text and the default button labeled `OK` which will dismiss the alert:
 * ProgressiveKITT.addAlert('Time for some thrilling heroics');
 *
 * // Create an alert with a button that will log the function's context (i.e. this) to the console.
 * // Context will be the ProgressiveKITT object by default:
 * ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!', function() {console.log(this);});
 * // Same as the previous example but the callback function will be run with the window as its context (ie this)
 * ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!', function() {console.log(this);}, {}, window);
 * ````
 *
 * @param string contents The contents of the message (text or HTML)
 * @param string buttonLabel The text to appear on the button (defaults to `OK`)
 * @param function buttonCallback A callback function to be called when button is pressed (defaults to dismissing message)
 * @param Object options Options for this message
 * @param Object context Optional context for the callback function. Defaults to ProgressiveKITT
 * @method addAlert
 */
var addAlert = function(contents, buttonLabel = 'OK', buttonCallback = undefined, options = undefined, context = this) {
  // @TODO: Add settings objects details in doc
  return _addMessage(contents, options, {label: buttonLabel, cb: buttonCallback, context: context});
};

/**
 * Draws a message to the GUI with two buttons.
 * Defaults: Buttons are labeled `OK` and `Cancel` and both dismiss the message.
 *
 * Some examples:
 * ````javascript
 * // Create a simple confirmation with some text and two default button labeled `OK` and `cancel` which will dismiss the alert:
 * ProgressiveKITT.addConfirm('You know what the chain of command is?');
 *
 * // Create a confirmation with a yes and no buttons that will log each function's context (i.e. this) to the console.
 * // Context will be the ProgressiveKITT object by default:
 * ProgressiveKITT.addConfirm('Ready?', 'Yes', function() {console.log('Yes!');}, 'No',  function() {console.log('No!');});
 * // Same as the previous example but the callback functions will be run with the window as its context (ie this)
 * ProgressiveKITT.addConfirm('Ready?', 'Yes', function() {console.log('Yes!');}, 'No',  function() {console.log('No!');}, {}, window, window);
 * ````
 *
 * @param string contents The contents of the message (text or HTML)
 * @param string button1Label The text to appear on the 1st button (defaults to `OK`)
 * @param function button1Callback A callback function to be called when 1st button is pressed (defaults to dismissing message)
 * @param string button2Label The text to appear on the 2nd button (defaults to `Cancel`)
 * @param function button2Callback A callback function to be called when button is pressed (defaults to dismissing message)
 * @param Object options Options for this message
 * @param Object context1 Optional context for the 1st callback function. Defaults to ProgressiveKITT
 * @param Object context2 Optional context for the 2nd callback function. Defaults to ProgressiveKITT
 * @method addConfirm
 */
var addConfirm = function(contents, button1Label = 'OK', button1Callback = undefined, button2Label = 'Cancel', button2Callback = undefined, options = undefined, context1 = this, context2 = this) {
  // @TODO: Add settings objects details in doc
  return _addMessage(contents, options, {label: button1Label, cb: button1Callback, context: context1}, {label: button2Label, cb: button2Callback, context: context2});
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
var debug = function(newState = true) {
  _debugState = !!newState;
};


module.exports = {
  setStylesheet:    setStylesheet,
  vroom:            vroom,
  render:           render,
  addMessage:       addMessage,
  addAlert:         addAlert,
  addConfirm:       addConfirm,
  deleteMessages:   deleteMessages,
  deleteMessage:    deleteMessage,
  show:             show,
  hide:             hide,
  debug:            debug
};
