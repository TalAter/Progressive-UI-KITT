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

/**
 * Draws a new message to the GUI
 *
 * @param string contents The contents of the message (text or HTML)
 * @param Object options Options for this message
 * @method addMessage
 */
var addMessage = function(msg) {
  self.clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
    clients.forEach(function (client) {
      client.postMessage({action: 'pkitt-message', msg: msg});
    });
  });
};

module.exports = {
  addMessage: addMessage
};
