

<!-- Start src/progressive-ui-kitt.js -->

<!--
Progressive UI KITT
version : 0.0.1
author  : Tal Ater @TalAter
license : MIT
https://github.com/TalAter/Progressive-UI-KITT
-->

## vroom()

Call after configuring KITT, to render its interface.

Identical to calling `ProgressiveKITT.render();` but less magical.

See: [render()](#render)

## render()

Call after configuring KITT, to render its interface.

## setStylesheet(string)

Set the URL for the stylesheet for the UI

If a stylesheet was previously set, calling this again will update the
interface with a new stylesheet (if the interface was already rendered,
it will be updated)

### Params:

* *string* stylesheet relative or absolute url to the stylesheet

## deleteMessages()

Deletes all existing messages from KITT and removes them from the DOM

## addMessage(string, Object)

Draws a new message to the GUI

### Params:

* *string* contents The contents of the message (text or HTML)
* *Object* options Options for this message

## hide()

Call to hide the GUI.

Interface must have been previously rendered with render()

## show()

Call to show the GUI if it has been hidden with hide()

Interface must have been previously rendered with render()

## debug([newState=true])

Turn output of debug messages to the console on or off.

* Debug is off by default.
* Calling with no arguments will turn debug on.

Examples:
````javascript
ProgressiveKITT.debug();       // turns debug messages on
ProgressiveKITT.debug(true);   // turns debug messages on
ProgressiveKITT.debug(false);  // turns debug messages off
````

### Params:

* **boolean** *[newState=true]* - Turn on/off debug messages

<!-- End src/progressive-ui-kitt.js -->

