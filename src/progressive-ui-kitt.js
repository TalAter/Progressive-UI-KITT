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
var _callbacks = { "show-message": [], "show-alert": [], "show-confirm": [], "hide-message": [] };


// Return a message element for a given message id
var _getMessageElement = function(msgID) {
  return document.getElementById(`progressivekitt-message-${msgID}`);
};

// Log a message to the console if debug mode is on
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

  const messageId = _messages.length+Date.now();

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

  if (options.class) {
    newMessageNode.classList.add(options.class.toString());
  }

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
        ProgressiveKITT.addAlert(payload.contents, payload.button.label, payload.options);
        break;
      case 'pkitt-confirm':
        ProgressiveKITT.addConfirm(payload.contents, payload.button1.label, payload.button2.label, payload.options);
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

// Receives a message id, and deletes the message node from the DOM
var _deleteMessageFromDOM = function(msgID) {
  var node = _getMessageElement(msgID);
  node.classList.remove('progressivekitt-message--shown');
  setTimeout(() => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }, 1000);
};

// This method receives an array of callbacks to iterate over, and invokes each of them
var _invokeCallbacks = function(callbackType, ...args) {
  _callbacks[callbackType].forEach(function(callback) {
    callback.callback.apply(callback.context, args);
  });
};

// Parse a button argument to make sure it is an object with the structure and contents KITT expects
var _parseButtonObject = function(button) {
  let buttonObject = ('string' === typeof button) ? {label: button} : button;
  if (!buttonObject.context) {
    buttonObject.context = this;
  }
  return buttonObject;
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
  // Remove from array of messages
  let filteredMessages = _messages.filter(message => {
    return message.id !== msgID;
  });
  // If message id was not found, log a notice to console.
  if (filteredMessages.length === _messages.length) {
    _logMessage('deleteMessage() did not find the message with the id', msgID);
    return;
  }
  _messages = filteredMessages;
  _invokeCallbacks('hide-message');
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
  // @TODO: Add options object details in doc
  var msgID = _addMessage(contents, options);
  _invokeCallbacks('show-message', _getMessageElement(msgID));
  return msgID;
};

/**
 * Draws a message to the GUI with a single button.
 *
 * Defaults: Button is labeled `OK` and dismisses the message.
 *
 * Some examples:
 * ````javascript
 * // Create a simple alert with some text and the default button labeled `OK` which will dismiss the alert:
 * ProgressiveKITT.addAlert('Time for some thrilling heroics');
 *
 * // Create a simple alert with some text and a custom button:
 * ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!');
 * ProgressiveKITT.addAlert('Time for some thrilling heroics', {label: 'Go!'});
 *
 * // Create an alert with a button that will log the function's context (i.e. this) to the console.
 * // Context will be the ProgressiveKITT object by default:
 * ProgressiveKITT.addAlert('Time for some thrilling heroics', {label:'Go!', callback: function() {console.log(this);}});
 * // Same as the previous example but the callback function will be run with the window as its context (i.e. this)
 * ProgressiveKITT.addAlert('Time for some thrilling heroics', {label:'Go!', callback: function() {console.log(this);}, context: window});
 * ````
 *
 * @param string contents The contents of the message (text or HTML)
 * @param string|Object button The text to appear on the button (defaults to `OK`), or an object containing details about the button (e.g. `{label: 'ok', callback: fn, context: window}`)
 * @param Object options Options for this message
 * @method addAlert
 */
var addAlert = function(contents, button = 'OK', options = undefined) {
  button = _parseButtonObject(button);
  // @TODO: Add options object details in doc
  var msgID = _addMessage(contents, options, {label: button.label, cb: button.callback, context: button.context});
  _invokeCallbacks('show-alert', _getMessageElement(msgID));
  return msgID;
};

/**
 * Draws a message to the GUI with two buttons.
 *
 * Defaults: Buttons are labeled `OK` and `Cancel` and both dismiss the message.
 *
 * Some examples:
 * ````javascript
 * // Create a simple confirmation with some text and two default button labeled `OK` and `cancel` which will dismiss the alert:
 * ProgressiveKITT.addConfirm('You know what the chain of command is?');
 *
 * // Create a confirmation with a yes and no buttons that will log each function's context (i.e. this) to the console.
 * // Context will be the ProgressiveKITT object by default:
 * ProgressiveKITT.addConfirm('Ready?', {label: 'Yes', callback: function() {console.log('Yes!');}}, {label:'No', callback: function() {console.log('No!');}});
 * // Same as the previous example but the callback functions will be run with the window as its context (i.e. this)
 * ProgressiveKITT.addConfirm('Ready?', {label: 'Yes', callback: function() {console.log('Yes!');}, context: window}, {label:'No', callback: function() {console.log('No!');}, context: window});
 * ````
 *
 * @param string contents The contents of the message (text or HTML)
 * @param string|Object button1 The text to appear on the button (defaults to `OK`), or an object containing details about the button (e.g. {label: 'ok', callback: fn, context: window})
 * @param string|Object button2 The text to appear on the button (defaults to `Cancel`), or an object containing details about the button (e.g. {label: 'ok', callback: fn, context: window})
 * @param Object options Options for this message
 * @method addConfirm
 */
var addConfirm = function(contents, button1 = 'OK', button2 = 'Cancel', options = undefined) {
  button1 = _parseButtonObject(button1);
  button2 = _parseButtonObject(button2);
  // @TODO: Add options object details in doc
  var msgID =  _addMessage(contents, options, {label: button1.label, cb: button1.callback, context: button1.context}, {label: button2.label, cb: button2.callback, context: button2.context});
  _invokeCallbacks('show-confirm', _getMessageElement(msgID));
  return msgID;
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

/**
 * Add a callback function to be called in case one of the following events happens:
 *
 * * `show-message` - Fired when a message is shown
 * * `show-alert` - Fired when an alert is shown
 * * `show-confirm` - Fired when an alert is shown
 *
 * #### Examples:
 * ````javascript
 * ProgressiveKITT.addCallback('show-message', function() {
 *   console.log('A message was just shown');;
 * });
 *
 * ````
 * @param {String} type - Name of event that will trigger this callback
 * @param {Function} callback - The function to call when event is triggered
 * @param {Object} [context] - Optional context for the callback function to be run in
 * @method addCallback
 */
var addCallback = function(type, callback, context) {
  if (_callbacks[type]  === undefined) {
    return;
  }
  if (typeof callback !== 'function') {
    return;
  }
  _callbacks[type].push({callback: callback, context: context || this});
};

/**
 * Remove callbacks from events.
 *
 * - Pass an event name and a callback command to remove that callback command from that event type.
 * - Pass just an event name to remove all callback commands from that event type.
 * - Pass undefined as event name and a callback command to remove that callback command from all event types.
 * - Pass no params to remove all callback commands from all event types.
 *
 * #### Examples:
 * ````javascript
 * ProgressiveKITT.addCallback('show-message', myFunction1);
 * ProgressiveKITT.addCallback('show-message', myFunction2);
 * ProgressiveKITT.addCallback('show-alert', myFunction1);
 * ProgressiveKITT.addCallback('show-alert', myFunction2);
 *
 * // Remove all callbacks from all events:
 * ProgressiveKITT.removeCallback();
 *
 * // Remove all callbacks attached to 'show-alert' event:
 * ProgressiveKITT.removeCallback('show-alert');
 *
 * // Remove myFunction2 from being called on 'show-message' event:
 * ProgressiveKITT.removeCallback('show-message', myFunction2);
 *
 * // Remove myFunction1 from being called on all events:
 * ProgressiveKITT.removeCallback(undefined, myFunction1);
 * ````
 *
 * @param   {String}    [type]      Name of event type to remove callback from
 * @param   {Function}  [callback]  The callback function to remove
 * @returns undefined
 * @method  removeCallback
 */
var removeCallback = function(type, callback) {
  let compareWithCallbackParameter = cb => {
    return cb.callback !== callback;
  };
  // Go over each callback type in callbacks store object
  Object.keys(_callbacks).forEach(callbackType => {
    // if this is the type user asked to delete, or she asked to delete all, go ahead.
    if (type === undefined || type === callbackType) {
      // If user asked to delete all callbacks in this type or all types
      if (callback === undefined) {
          _callbacks[callbackType] = [];
        } else {
          // Remove all matching callbacks
          _callbacks[callbackType] = _callbacks[callbackType].filter(compareWithCallbackParameter);
      }
    }
  });
};

module.exports = {
  setStylesheet,
  vroom,
  render,
  addMessage,
  addAlert,
  addConfirm,
  deleteMessages,
  deleteMessage,
  show,
  hide,
  debug,
  addCallback,
  removeCallback
};
