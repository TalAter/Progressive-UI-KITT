

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

## addAlert(string, string|Object, Object)

Draws a message to the GUI with a single button.
Defaults: Button is labeled `OK` and dismisses the message.

Some examples:
````javascript
// Create a simple alert with some text and the default button labeled `OK` which will dismiss the alert:
ProgressiveKITT.addAlert('Time for some thrilling heroics');

// Create a simple alert with some text and a custom button:
ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!');
ProgressiveKITT.addAlert('Time for some thrilling heroics', {label: 'Go!'});

// Create an alert with a button that will log the function's context (i.e. this) to the console.
// Context will be the ProgressiveKITT object by default:
ProgressiveKITT.addAlert('Time for some thrilling heroics', {label:'Go!', callback: function() {console.log(this);}});
// Same as the previous example but the callback function will be run with the window as its context (ie this)
ProgressiveKITT.addAlert('Time for some thrilling heroics', {label:'Go!', callback: function() {console.log(this);}, context: window});
````

### Params:

* *string* contents The contents of the message (text or HTML)
* *string|Object* button The text to appear on the button (defaults to `OK`), or an object containing details about the button (e.g. {label: 'ok', callback: fn, context: this})
* *Object* options Options for this message

## addConfirm(string, string|Object, string|Object, Object)

Draws a message to the GUI with two buttons.
Defaults: Buttons are labeled `OK` and `Cancel` and both dismiss the message.

Some examples:
````javascript
// Create a simple confirmation with some text and two default button labeled `OK` and `cancel` which will dismiss the alert:
ProgressiveKITT.addConfirm('You know what the chain of command is?');

// Create a confirmation with a yes and no buttons that will log each function's context (i.e. this) to the console.
// Context will be the ProgressiveKITT object by default:
ProgressiveKITT.addConfirm('Ready?', {label: 'Yes', callback: function() {console.log('Yes!');}}, {label:'No', callback: function() {console.log('No!');}});
// Same as the previous example but the callback functions will be run with the window as its context (ie this)
ProgressiveKITT.addConfirm('Ready?', {label: 'Yes', callback: function() {console.log('Yes!');}, context: window}, {label:'No', callback: function() {console.log('No!');}, context: window});
````

### Params:

* *string* contents The contents of the message (text or HTML)
* *string|Object* button1 The text to appear on the button (defaults to `OK`), or an object containing details about the button (e.g. {label: 'ok', callback: fn, context: this})
* *string|Object* button2 The text to appear on the button (defaults to `Cancel`), or an object containing details about the button (e.g. {label: 'ok', callback: fn, context: this})
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

## addCallback(type, callback, [context])

Add a callback function to be called in case one of the following events happens:

* `show-message` - Fired when a message is shown
* `show-alert` - Fired when an alert is shown
* `show-confirm` - Fired when an alert is shown

#### Examples:
````javascript
ProgressiveKITT.addCallback('show-message', function() {
  console.log('A message was just shown');;
});

````

### Params:

* **String** *type* - Name of event that will trigger this callback
* **Function** *callback* - The function to call when event is triggered
* **Object** *[context]* - Optional context for the callback function to be run in

## removeCallback([type], [callback])

Remove callbacks from events.

- Pass an event name and a callback command to remove that callback command from that event type.
- Pass just an event name to remove all callback commands from that event type.
- Pass undefined as event name and a callback command to remove that callback command from all event types.
- Pass no params to remove all callback commands from all event types.

#### Examples:
````javascript
ProgressiveKITT.addCallback('show-message', myFunction1);
ProgressiveKITT.addCallback('show-message', myFunction2);
ProgressiveKITT.addCallback('show-alert', myFunction1);
ProgressiveKITT.addCallback('show-alert', myFunction2);

// Remove all callbacks from all events:
ProgressiveKITT.removeCallback();

// Remove all callbacks attached to 'show-alert' event:
ProgressiveKITT.removeCallback('show-alert');

// Remove myFunction2 from being called on 'show-message' event:
ProgressiveKITT.removeCallback('show-message', myFunction2);

// Remove myFunction1 from being called on all events:
ProgressiveKITT.removeCallback(undefined, myFunction1);
````

### Params:

* **String** *[type]* Name of event type to remove callback from
* **Function** *[callback]* The callback function to remove

### Return:

* undefined

<!-- End src/progressive-ui-kitt.js -->

