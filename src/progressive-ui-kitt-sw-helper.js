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

// Method used to post messages to all of a service worker's clients, including uncontrolled ones.
var _postMessageToAllClients = function(payload, type) {
  self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({action: `pkitt-${type}`, payload: payload});
    });
  });
};

/**
 * Draws a new message to the GUI
 *
 * @param string contents The contents of the message (text or HTML)
 * @param Object options Options for this message
 * @method addMessage
 */
var addMessage = function(contents, options) {
  _postMessageToAllClients({
    contents: contents,
    options: options
  }, 'message');
};

/**
 * Draws a new alert message to the GUI
 *
 * @param string contents The contents of the message (text or HTML)
 * @param string buttonLabel The text to appear on the button (defaults to `OK`)
 * @param function buttonCallback A callback function to be called when button is pressed (defaults to dismissing message)
 * @param Object options Options for this message
 * @param Object context Optional context for the callback function. Defaults to ProgressiveKITT
 * @method addAlert
 */
var addAlert = function(contents, buttonLabel, buttonCallback, options, context) {
  _postMessageToAllClients({
    contents: contents,
    buttonLabel: buttonLabel,
    buttonCallback: buttonCallback,
    options: options,
    context: context
  }, 'alert');
};

/**
 * Draws a confirmation message to the GUI with two buttons.
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
var addConfirm = function(contents, button1Label, button1Callback, button2Label, button2Callback, options, context1, context2) {
  _postMessageToAllClients({
    contents: contents,
    button1Label: button1Label,
    button1Callback: button1Callback,
    button2Label: button2Label,
    button2Callback: button2Callback,
    options: options,
    context1: context1,
    context2: context2
  }, 'confirm');
};

module.exports = {
  addMessage:     addMessage,
  addAlert:       addAlert,
  addConfirm:     addConfirm
};
