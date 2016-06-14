/*
Progressive UI KITT
version : 0.0.1
author  : Tal Ater @TalAter
license : MIT
https://github.com/TalAter/Progressive-UI-KITT
*/

"use strict";

var _stylesheet;
var _stylesheetNode;

var _guiNodes;

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
      _stylesheetNode.id = 'puikitt-style-sheet';
      document.body.appendChild(_stylesheetNode);
    }
  }
};

// Called once to generate the GUI nodes
var _createGUI = function() {
  // create GUI
  _guiNodes = document.createElement('div');
  _guiNodes.id = 'puikitt-ui';
  _guiNodes.innerHTML = '';
  _guiNodes.style.display = 'none';
  document.body.appendChild(_guiNodes);

  _updateStylesheet();
};

/**
 * Call after configuring KITT, to render its interface.
 *
 * Identical to calling `puikitt.render();` but less magical.
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

module.exports = {
  setStylesheet: setStylesheet,
  vroom: vroom,
  render: render
};
