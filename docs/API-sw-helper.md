

<!-- Start src/progressive-ui-kitt-sw-helper.js -->

<!--
 Progressive UI KITT
 version : 0.0.1
 author  : Tal Ater @TalAter
 license : MIT
 https://github.com/TalAter/Progressive-UI-KITT
 -->

## addMessage(string, Object)

Draws a new message to the GUI

### Params:

* *string* contents The contents of the message (text or HTML)
* *Object* options Options for this message

## addAlert(string, string|Object, Object)

Draws a new alert message to the GUI

### Params:

* *string* contents The contents of the message (text or HTML)
* *string|Object* button The text to appear on the button (defaults to `OK`), or an object containing the label (e.g. {label: 'OK'})
* *Object* options Options for this message

## addConfirm(string, string|Object, string|Object, Object)

Draws a confirmation message to the GUI with two buttons.

### Params:

* *string* contents The contents of the message (text or HTML)
* *string|Object* button1 The text to appear on the button (defaults to `OK`), or an object containing the label (e.g. {label: 'OK'})
* *string|Object* button2 The text to appear on the button (defaults to `Cancel`), or an object containing the label (e.g. {label: 'Cancel'})
* *Object* options Options for this message

<!-- End src/progressive-ui-kitt-sw-helper.js -->

