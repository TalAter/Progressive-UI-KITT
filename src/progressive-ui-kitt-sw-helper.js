/*
 <!--
 Progressive UI KITT
 version : 0.0.1
 author  : Tal Ater @TalAter
 license : MIT
 https://github.com/TalAter/Progressive-UI-KITT
 -->
 */

'use strict';

// Method used to post messages to all of a service worker's clients, including uncontrolled ones.
var _postMessageToClients = function(payload, type, client) {
  const message = { action: `pkitt-${type}`, payload: payload };
  if (client) {
    if ('string' === typeof client) {
      self.clients.get(client).then(function(client) {
        client.postMessage(message);
      });
    } else {
      client.postMessage(message);
    }
  } else {
    self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
      clients.forEach(client => {
        client.postMessage(message);
      });
    });
  }
};

// Parse a button argument to make sure it is an object with the structure and contents KITT expects
var _parseButtonObject = function(button) {
  return 'string' === typeof button ? { label: button } : button;
};

/**
 * Draws a new message to the GUI
 *
 * @param string contents The contents of the message (text or HTML)
 * @param Object options Options for this message
 * @param string|Object A client ID, or an actual client object to send the message to. Defaults to all clients.
 * @method addMessage
 */
var addMessage = function(contents, options, client) {
  _postMessageToClients({
    contents,
    options
  }, 'message', client);
};

/**
 * Draws a new alert message to the GUI
 *
 * @param string contents The contents of the message (text or HTML)
 * @param string|Object button The text to appear on the button (defaults to `OK`), or an object containing the label (e.g. {label: 'OK'})
 * @param Object options Options for this message
 * @param string|Object A client ID, or an actual client object to send the message to. Defaults to all clients.
 * @method addAlert
 */
var addAlert = function(contents, button = 'OK', options = {}, client = undefined) {
  button = _parseButtonObject(button);
  _postMessageToClients({
    contents,
    button: {
      label: button.label
    },
    options
  }, 'alert', client);
};

/**
 * Draws a confirmation message to the GUI with two buttons.
 *
 * @param string contents The contents of the message (text or HTML)
 * @param string|Object button1 The text to appear on the button (defaults to `OK`), or an object containing the label (e.g. {label: 'OK'})
 * @param string|Object button2 The text to appear on the button (defaults to `Cancel`), or an object containing the label (e.g. {label: 'Cancel'})
 * @param Object options Options for this message
 * @param string|Object A client ID, or an actual client object to send the message to. Defaults to all clients.
 * @method addConfirm
 */
var addConfirm = function(contents, button1 = 'OK', button2 = 'Cancel', options = {}, client = undefined) {
  button1 = _parseButtonObject(button1);
  button2 = _parseButtonObject(button2);
  _postMessageToClients({
    contents,
    button1: {
      label: button1.label
    },
    button2: {
      label: button2.label
    },
    options,
  }, 'confirm', client);
};

module.exports = {
  addMessage,
  addAlert,
  addConfirm
};
