

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

## deleteMessage(msgID)

Deletes a single message from KITT and removes it from the DOM

### Params:

* *msgID* 

## addMessage(string, Object)

Draws a message to the GUI

### Params:

* *string* contents The contents of the message (text or HTML)
* *Object* options Options for this message

## addAlert(string, string, function, Object, Object)

Draws a message to the GUI with a single button.

Some examples:
````javascript
// Create a simple alert with some text and the default button labeled ok which will dismiss the alert:
ProgressiveKITT.addAlert('Time for some thrilling heroics');

// Create an alert with a button that will log the function's context (i.e. this) to the console.
// Context will be the ProgressiveKITT object by default:
ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!', function() {console.log(this);});
// Same as the previous example but the callback function will be run with the window as its context (ie this)
ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!', function() {console.log(this);}, {}, window);
````

### Params:

* *string* contents The contents of the message (text or HTML)
* *string* buttonLabel The text to appear on the button (defaults to `OK`)
* *function* buttonCallback A callback function to be called when button is pressed (defaults to dismissing message)
* *Object* options Options for this message
* *Object* context Optional context for the callback function. Defaults to ProgressiveKITT

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

