

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

Deletes all exisitng messages from KITT and removes them from the DOM

## addMessage(string)

Draws a new message to the GUI

### Params:

* *string* contents the contents of the message (text or HTML)

<!-- End src/progressive-ui-kitt.js -->

