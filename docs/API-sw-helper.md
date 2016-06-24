

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

## addAlert(string, string, function, Object, Object)

Draws a new alert message to the GUI

### Params:

* *string* contents The contents of the message (text or HTML)
* *string* buttonLabel The text to appear on the button (defaults to `OK`)
* *function* buttonCallback A callback function to be called when button is pressed (defaults to dismissing message)
* *Object* options Options for this message
* *Object* context Optional context for the callback function. Defaults to ProgressiveKITT

## addConfirm(string, string, function, string, function, Object, Object, Object)

Draws a confirmation message to the GUI with two buttons.

### Params:

* *string* contents The contents of the message (text or HTML)
* *string* button1Label The text to appear on the 1st button (defaults to `OK`)
* *function* button1Callback A callback function to be called when 1st button is pressed (defaults to dismissing message)
* *string* button2Label The text to appear on the 2nd button (defaults to `Cancel`)
* *function* button2Callback A callback function to be called when button is pressed (defaults to dismissing message)
* *Object* options Options for this message
* *Object* context1 Optional context for the 1st callback function. Defaults to ProgressiveKITT
* *Object* context2 Optional context for the 2nd callback function. Defaults to ProgressiveKITT

<!-- End src/progressive-ui-kitt-sw-helper.js -->

