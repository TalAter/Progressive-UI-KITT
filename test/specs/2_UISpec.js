(function() {
  "use strict";


  describe('ProgressiveKITT.vroom', function() {

    it('should add a visible gui to the DOM inside a div#progressivekitt-ui', function () {
      expect(getWrappers()).toHaveLength(0);
      ProgressiveKITT.vroom();
      expect(getWrappers()).toHaveLength(1);
      expect(getWrapper()).toBeInDOM();
      expect(getWrapper()).toBeVisible();
      expect($(getWrapper())).toHaveId('progressivekitt-ui');
    });

    it('should not attach a style sheet if non was defined', function () {
      ProgressiveKITT.vroom();
      expect(getStyleSheets()).toHaveLength(0);
    });

    it('should attach a style sheet if one was defined with ProgressiveKITT.setStyle', function () {
      ProgressiveKITT.setStylesheet('flat.css');
      ProgressiveKITT.vroom();
      expect(getStyleSheets()).toHaveLength(1);
      expect(getStyleSheet()).toHaveId('progressivekitt-style-sheet');
      expect(getStyleSheet().rel).toEqual('stylesheet');
      expect(getStyleSheet().href).toContain('flat.css');
    });

  });


  describe('ProgressiveKITT.setStylesheet', function() {

    it('should be callable and return undefined', function () {
      expect(ProgressiveKITT.setStylesheet()).toBe(undefined);
    });

    it('should change the stylesheet every time it is called after gui was rendered', function () {
      ProgressiveKITT.vroom();
      ProgressiveKITT.setStylesheet('style1.css');
      expect(getStyleSheets()).toHaveLength(1);
      expect(getStyleSheet().href).toContain('style1.css');
      ProgressiveKITT.setStylesheet('style2.css');
      expect(getStyleSheets()).toHaveLength(1);
      expect(getStyleSheet().href).not.toContain('style1.css');
      expect(getStyleSheet().href).toContain('style2.css');
    });

  });


  describe('ProgressiveKITT.addMessage', function() {

    beforeEach(function() {
      spyOn(console, 'log');
      ProgressiveKITT.debug(false);
      ProgressiveKITT.vroom();
      jasmine.clock().install();
    });

    afterEach(function() {
      ProgressiveKITT.deleteMessages();
      jasmine.clock().tick(200000);
      jasmine.clock().uninstall();
    });

    it('should add a visible div to the DOM if passed a string as the first parameter', function () {
      expect(getMessages()).toHaveLength(0);
      ProgressiveKITT.addMessage('Time for some thrilling heroics');
      expect(getMessages()).toHaveLength(1);
      expect(getLatestMessage()).toBeInDOM();
      expect(getLatestMessage()).toBeVisible();
    });

    it('should add additional messages on each consecutive call', function () {
      expect(getMessages()).toHaveLength(0);
      ProgressiveKITT.addMessage('Time for some thrilling heroics');
      expect(getMessages()).toHaveLength(1);
      ProgressiveKITT.addMessage('That sounds like something out of science fiction');
      expect(getMessages()).toHaveLength(2);
    });

    it('should not add a div to the UI if not passed a string as the first parameter', function () {
      expect(getMessages()).toHaveLength(0);
      ProgressiveKITT.addMessage();
      expect(getMessages()).toHaveLength(0);
    });

    it('should return an id of the message created', function () {
      var messageId = ProgressiveKITT.addMessage('Time for some thrilling heroics');
      expect(messageId).toEqual(jasmine.any(Number));
    });

    it('should return undefined if not passed a string as the first parameter', function () {
      var messageId = ProgressiveKITT.addMessage();
      expect(messageId).toBe(undefined);
    });

    it('should create the message div with the class `progressivekitt-message`', function () {
      ProgressiveKITT.addMessage('Time for some thrilling heroics');
      expect(getLatestMessage()).toHaveClass('progressivekitt-message');
    });

    it('should add the class `progressivekitt-message--shown` to the message div 20 ms after it is created', function () {
      ProgressiveKITT.addMessage('Time for some thrilling heroics');
      expect(getLatestMessage()).not.toHaveClass('progressivekitt-message--shown');
      jasmine.clock().tick(20);
      expect(getLatestMessage()).toHaveClass('progressivekitt-message--shown');
    });

    it('should create the message div with an id composed of `progressivekitt-message-` and the message id', function () {
      var messageId = ProgressiveKITT.addMessage('Time for some thrilling heroics');
      expect($(getLatestMessage())).toHaveId('progressivekitt-message-'+messageId);
    });

    describe('ProgressiveKITT.addMessage(text)', function() {

      it('should use the text passed to it as the content of the div it adds', function () {
        var messageText = 'Time for some thrilling heroics';
        ProgressiveKITT.addMessage(messageText);
        expect(getLatestMessage().text()).toEqual(messageText);
      });

    });

    describe('ProgressiveKITT.addMessage(html)', function() {

      it('should use HTML passed to it as HTML in the div it adds', function () {
        var messageText = 'Time for some thrilling <strong>heroics</strong>';
        ProgressiveKITT.addMessage(messageText);
        expect(getLatestMessage().html()).toEqual(messageText);
        expect($('strong', getLatestMessage())).toHaveLength(1);
      });

    });

    describe('ProgressiveKITT.addMessage(text, settings)', function() {

      it('should accept an optional second parameter containing an object with settings', function () {
        var messageText = 'Time for some thrilling heroics';
        ProgressiveKITT.debug(true);
        ProgressiveKITT.addMessage(messageText);
        ProgressiveKITT.addMessage(messageText, {});
        expect(console.log).not.toHaveBeenCalled();
      });

      it('should log a message if second parameter is not an object and debug is on', function () {
        var messageText = 'Time for some thrilling heroics';
        ProgressiveKITT.debug(true);
        ProgressiveKITT.addMessage(messageText, messageText);
        expect(console.log).toHaveBeenCalledTimes(1);
        ProgressiveKITT.addMessage(messageText, 42);
        expect(console.log).toHaveBeenCalledTimes(2);
      });

      it('should not log a message if second parameter is not an object and debug is off', function () {
        var messageText = 'Time for some thrilling heroics';
        ProgressiveKITT.debug(false);
        ProgressiveKITT.addMessage(messageText, messageText);
        ProgressiveKITT.addMessage(messageText, 42);
        expect(console.log).not.toHaveBeenCalled();
      });

      describe('ProgressiveKITT.addMessage(text, {hideAfter: integer})', function() {

        it('should hide message after the number of milliseconds passed as `hideAfter` in the settings object', function () {
          expect(getMessages()).toHaveLength(0);
          ProgressiveKITT.addMessage('Time for some thrilling heroics', { hideAfter: 5000});
          ProgressiveKITT.addMessage('Time for some thrilling heroics', { hideAfter: 10000});
          expect(getMessages()).toHaveLength(2);
          expect(getLatestMessage()).toBeInDOM();
          expect(getLatestMessage()).toBeVisible();
          jasmine.clock().tick(6000);
          expect(getMessages()).toHaveLength(1);
          expect(getLatestMessage()).toBeInDOM();
          expect(getLatestMessage()).toBeVisible();
          jasmine.clock().tick(20000);
          expect(getMessages()).toHaveLength(0);
        });

        it('should show message indefinitely if not passed `hideAfter` in the settings object', function () {
          expect(getMessages()).toHaveLength(0);
          ProgressiveKITT.addMessage('Time for some thrilling heroics');
          expect(getMessages()).toHaveLength(1);
          expect(getLatestMessage()).toBeInDOM();
          expect(getLatestMessage()).toBeVisible();
          jasmine.clock().tick(20000);
          expect(getMessages()).toHaveLength(1);
          expect(getLatestMessage()).toBeInDOM();
          expect(getLatestMessage()).toBeVisible();
        });

        it('should show message indefinitely if a value that isn\'t an integer over 0 in `hideAfter` in the settings object', function () {
          expect(getMessages()).toHaveLength(0);
          ProgressiveKITT.addMessage('Time for some thrilling heroics', { hideAfter: 0 });
          ProgressiveKITT.addMessage('Time for some thrilling heroics', { hideAfter: -1 });
          ProgressiveKITT.addMessage('Time for some thrilling heroics', { hideAfter: false });
          expect(getMessages()).toHaveLength(3);
          expect(getLatestMessage()).toBeInDOM();
          expect(getLatestMessage()).toBeVisible();
          jasmine.clock().tick(20000);
          expect(getMessages()).toHaveLength(3);
          expect(getLatestMessage()).toBeInDOM();
          expect(getLatestMessage()).toBeVisible();

          it('should not throw an error if messages deleted before they timeout with hideAfter', function () {
            var messageText = 'Time for some thrilling heroics';
            expect(function() {
              ProgressiveKITT.addMessage(messageText);
              ProgressiveKITT.deleteMessages();
              jasmine.clock().tick(20000);
            }).not.toThrowError();
          });

        });

      });

      describe('ProgressiveKITT.addMessage(text, { class: string })', function() {

        it('should add a class to the message div equal to the value passed as `class` in the settings object (if it is a string)', function () {
          ProgressiveKITT.addMessage('Time for some thrilling heroics', { class: 'progressivekitt-message--offline' });
          expect(getLatestMessage()).toHaveClass('progressivekitt-message--offline');
        });

        it('should add a class to the message div equal to the string representation of the value passed as `class` in the settings object (if it is not a string)', function () {
          ProgressiveKITT.addMessage('Time for some thrilling heroics', { class: true });
          expect(getLatestMessage()).toHaveClass('true');
        });

      });

    });

  });


  describe('ProgressiveKITT.addAlert', function() {

    beforeEach(function() {
      ProgressiveKITT.debug(false);
      ProgressiveKITT.vroom();
      jasmine.clock().install();
    });

    afterEach(function() {
      ProgressiveKITT.deleteMessages();
      jasmine.clock().tick(200000);
      jasmine.clock().uninstall();
    });

    it('should add a visible div to the DOM if passed a string as the first parameter', function () {
      expect(getMessages()).toHaveLength(0);
      ProgressiveKITT.addAlert('Time for some thrilling heroics');
      expect(getMessages()).toHaveLength(1);
      expect(getLatestMessage()).toBeInDOM();
      expect(getLatestMessage()).toBeVisible();
    });

    it('should always contain 1 button in the div it renders', function () {
      ProgressiveKITT.addAlert('Time for some thrilling heroics');
      expect(getLatestMessageButtons()).toHaveLength(1);
    });

    describe('ProgressiveKITT.addAlert OK button', function() {

      it('should always be a span with the classes progressivekitt-button', function () {
        ProgressiveKITT.addAlert('Time for some thrilling heroics');
        var button = $('span.progressivekitt-button', getLatestMessage());
        expect(button).toHaveLength(1);
      });

      it('should create the button with an id composed of `progressivekitt-button-0-` and the message id', function () {
        var messageId = ProgressiveKITT.addAlert('Time for some thrilling heroics');
        expect($(getLatestMessageButtons()[0])).toHaveId('progressivekitt-button-0-'+messageId);
      });

      it('should be labeled `OK`, if no label was passed', function () {
        ProgressiveKITT.addAlert('Time for some thrilling heroics');
        expect(getLatestMessageButtons()[0].innerText).toEqual('OK');
      });

      it('should be labeled with the value passed to it as a label', function () {
        ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Yeah!');
        expect(getLatestMessageButtons()[0].innerText).toEqual('Yeah!');
      });

      it('should dismiss the alert message when clicked if no callback function was passed', function () {
        ProgressiveKITT.addAlert('Time for some thrilling heroics');
        simulateClick(getLatestMessageButtons()[0]);
        expect(getMessages()).toHaveLength(1);
        jasmine.clock().tick(2000);
        expect(getMessages()).toHaveLength(0);
      });

      it('should call the callback function and dismiss the alert message when clicked', function () {
        var spyOnButton = jasmine.createSpy();
        ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Spy', spyOnButton);
        expect(spyOnButton).not.toHaveBeenCalled();
        simulateClick(getLatestMessageButtons()[0]);
        expect(spyOnButton).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(2000);
        expect(getMessages()).toHaveLength(0);
      });

    });

    describe('ProgressiveKITT.addAlert(text, label, callback, { class: string })', function() {

      it('should add a class to the alert div equal to the value passed as `class` in the settings object (if it is a string)', function () {
        ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!', function() {console.log('Aha');}, {class: 'progressivekitt-message--offline'});
        expect(getLatestMessage()).toHaveClass('progressivekitt-message--offline');
      });

      it('should add a class to the alert div equal to the string representation of the value passed as `class` in the settings object (if it is not a string)', function () {
        ProgressiveKITT.addAlert('Time for some thrilling heroics', 'Go!', function() {console.log('Aha');}, { class: true });
        expect(getLatestMessage()).toHaveClass('true');
      });

    });

  });


  describe('ProgressiveKITT.addConfirm', function() {

    beforeEach(function() {
      ProgressiveKITT.debug(false);
      ProgressiveKITT.vroom();
      jasmine.clock().install();
    });

    afterEach(function() {
      ProgressiveKITT.deleteMessages();
      jasmine.clock().tick(200000);
      jasmine.clock().uninstall();
    });

    it('should add a visible div to the DOM if passed a string as the first parameter', function () {
      expect(getMessages()).toHaveLength(0);
      ProgressiveKITT.addConfirm('You know what the chain of command is?');
      expect(getMessages()).toHaveLength(1);
      expect(getLatestMessage()).toBeInDOM();
      expect(getLatestMessage()).toBeVisible();
    });

    it('should always contain 2 buttons in the div it renders', function () {
      ProgressiveKITT.addConfirm('You know what the chain of command is?');
      expect(getLatestMessageButtons()).toHaveLength(2);
    });

    describe('ProgressiveKITT.addConfirm OK button', function() {

      it('should always be a span with the classes progressivekitt-button', function () {
        ProgressiveKITT.addConfirm('You know what the chain of command is?');
        var button = $('span.progressivekitt-button', getLatestMessage());
        expect(button).toHaveLength(2);
      });

      it('should create the button with an id composed of `progressivekitt-button-0-` and the message id', function () {
        var messageId = ProgressiveKITT.addConfirm('You know what the chain of command is?');
        expect($(getLatestMessageButtons()[0])).toHaveId('progressivekitt-button-0-'+messageId);
      });

      it('should be labeled `OK`, if no label was passed', function () {
        ProgressiveKITT.addConfirm('You know what the chain of command is?');
        expect(getLatestMessageButtons()[0].innerText).toEqual('OK');
      });

      it('should dismiss the alert message when clicked if no callback function was passed', function () {
        ProgressiveKITT.addConfirm('You know what the chain of command is?');
        simulateClick(getLatestMessageButtons()[0]);
        expect(getMessages()).toHaveLength(1);
        jasmine.clock().tick(2000);
        expect(getMessages()).toHaveLength(0);
      });

      it('should call the callback function and dismiss the alert message when clicked', function () {
        var spyOnButton = jasmine.createSpy();
        ProgressiveKITT.addConfirm('You know what the chain of command is?', 'Spy', spyOnButton);
        expect(spyOnButton).not.toHaveBeenCalled();
        simulateClick(getLatestMessageButtons()[0]);
        expect(spyOnButton).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(2000);
        expect(getMessages()).toHaveLength(0);
      });

    });

    describe('ProgressiveKITT.addConfirm Cancel button', function() {

      it('should always be a span with the classes progressivekitt-button', function () {
        ProgressiveKITT.addConfirm('You know what the chain of command is?');
        var button = $('span.progressivekitt-button', getLatestMessage());
        expect(button).toHaveLength(2);
      });

      it('should create the button with an id composed of `progressivekitt-button-1-` and the message id', function () {
        var messageId = ProgressiveKITT.addConfirm('You know what the chain of command is?');
        expect($(getLatestMessageButtons()[1])).toHaveId('progressivekitt-button-1-'+messageId);
      });

      it('should be labeled `Cancel`, if no label was passed', function () {
        ProgressiveKITT.addConfirm('You know what the chain of command is?');
        expect(getLatestMessageButtons()[1].innerText).toEqual('Cancel');
      });

      it('should dismiss the alert message when clicked if no callback function was passed', function () {
        ProgressiveKITT.addConfirm('You know what the chain of command is?');
        simulateClick(getLatestMessageButtons()[1]);
        expect(getMessages()).toHaveLength(1);
        jasmine.clock().tick(2000);
        expect(getMessages()).toHaveLength(0);
      });

      it('should call the callback function and dismiss the alert message when clicked', function () {
        var spyOnButton1 = jasmine.createSpy();
        var spyOnButton2 = jasmine.createSpy();
        ProgressiveKITT.addConfirm('You know what the chain of command is?', 'Yes', spyOnButton1, 'No', spyOnButton2);
        expect(spyOnButton1).not.toHaveBeenCalled();
        expect(spyOnButton2).not.toHaveBeenCalled();
        simulateClick(getLatestMessageButtons()[1]);
        expect(spyOnButton1).not.toHaveBeenCalled();
        expect(spyOnButton2).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(2000);
        expect(getMessages()).toHaveLength(0);
      });

    });

  });


  describe('ProgressiveKITT.deleteMessages', function() {

    beforeEach(function() {
      ProgressiveKITT.debug(false);
      jasmine.clock().install();
      ProgressiveKITT.vroom();
      ProgressiveKITT.addMessage("Time for some thrilling heroics");
      ProgressiveKITT.addMessage("Next time you want to stab me in the back, have the guts to do it to my face");
      ProgressiveKITT.addMessage("Man walks down the street in a hat like that, you know he's not afraid of anything");
    });

    afterEach(function() {
      ProgressiveKITT.deleteMessages();
      jasmine.clock().tick(200000);
      jasmine.clock().uninstall();
    });

    it('should return undefined', function () {
      expect(ProgressiveKITT.deleteMessages()).toBe(undefined);
    });

    it('should delete all existing messages from the DOM', function () {
      expect(getMessages()).toHaveLength(3);
      ProgressiveKITT.deleteMessages();
      jasmine.clock().tick(2000);
      expect(getMessages()).toHaveLength(0);
    });

    it('should not throw an error if there are no messages', function () {
      expect(getMessages()).toHaveLength(3);
      ProgressiveKITT.deleteMessages();
      jasmine.clock().tick(2000);
      expect(getMessages()).toHaveLength(0);
      expect(function() {
        ProgressiveKITT.deleteMessages();
      }).not.toThrowError();
      jasmine.clock().tick(2000);
      expect(getMessages()).toHaveLength(0);
    });

  });


  describe('ProgressiveKITT.deleteMessage', function() {

    var msgID1;
    var msgID2;
    var msgID3;

    beforeEach(function() {
      ProgressiveKITT.debug(false);
      jasmine.clock().install();
      spyOn(console, 'log');
      ProgressiveKITT.debug(false);
      ProgressiveKITT.vroom();
      ProgressiveKITT.deleteMessages();
      msgID1 = ProgressiveKITT.addMessage("Time for some thrilling heroics");
      msgID2 = ProgressiveKITT.addMessage("Next time you want to stab me in the back, have the guts to do it to my face");
      msgID3 = ProgressiveKITT.addMessage("Man walks down the street in a hat like that, you know he's not afraid of anything");
    });

    afterEach(function() {
      ProgressiveKITT.deleteMessages();
      jasmine.clock().tick(200000);
      jasmine.clock().uninstall();
    });

    it('should return undefined', function () {
      expect(ProgressiveKITT.deleteMessage()).toBe(undefined);
    });

    it('should delete from KITT and the DOM only the message with the id passed to it as the first argument', function () {
      expect(getMessages()).toHaveLength(3);
      ProgressiveKITT.deleteMessage(msgID1);
      jasmine.clock().tick(2000);
      expect(getMessages()).toHaveLength(2);
    });

    it('should log to console if the given message id was not found and debug is on', function () {
      ProgressiveKITT.debug(true);
      expect(getMessages()).toHaveLength(3);
      ProgressiveKITT.deleteMessage('Black market beagles');
      jasmine.clock().tick(2000);
      expect(getMessages()).toHaveLength(3);
      expect(console.log).toHaveBeenCalled();
    });

    it('should not log to console if the given message id was not found and debug is off', function () {
      ProgressiveKITT.debug(false);
      expect(getMessages()).toHaveLength(3);
      ProgressiveKITT.deleteMessage('Black market beagles');
      jasmine.clock().tick(2000);
      expect(getMessages()).toHaveLength(3);
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should not throw an error if there are no messages', function () {
      ProgressiveKITT.deleteMessages();
      expect(function() {
        ProgressiveKITT.deleteMessage(msgID1);
      }).not.toThrowError();
      jasmine.clock().tick(2000);
      expect(getMessages()).toHaveLength(0);
    });

  });


  describe('ProgressiveKITT.hide', function() {

    beforeEach(function() {
      ProgressiveKITT.vroom();
    });

    it('should add progressivekitt-ui--hidden class to the GUI', function () {
      ProgressiveKITT.show();
      expect(getWrapper()).not.toHaveClass('progressivekitt-ui--hidden');
      expect(getWrapper()).toBeVisible();
      ProgressiveKITT.hide();
      expect(getWrapper()).toHaveClass('progressivekitt-ui--hidden');
      expect(getWrapper()).not.toBeVisible();
    });

  });


  describe('ProgressiveKITT.show', function() {

    beforeEach(function() {
      ProgressiveKITT.vroom();
    });

    it('should remove progressivekitt-ui--hidden class from the GUI', function () {
      ProgressiveKITT.hide();
      expect(getWrapper()).toHaveClass('progressivekitt-ui--hidden');
      expect(getWrapper()).not.toBeVisible();
      ProgressiveKITT.show();
      expect(getWrapper()).not.toHaveClass('progressivekitt-ui--hidden');
      expect(getWrapper()).toBeVisible();
    });

  });


  describe('ProgressiveKITT.debug', function() {

    var triggerDebugMessage = function() {
      ProgressiveKITT.addMessage('Time for some thrilling heroics', 'I should be an object');
    };

    beforeEach(function(){
      spyOn(console, 'log');
    });

    it('should be off by default', function() {
      triggerDebugMessage();
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should turn on debug messages when called without a parameter', function() {
      ProgressiveKITT.debug();
      triggerDebugMessage();
      expect(console.log).toHaveBeenCalled();
    });

    it('should turn off debug messages when called with a parameter that is false', function() {
      ProgressiveKITT.debug(true);
      ProgressiveKITT.debug(false);
      triggerDebugMessage();
      expect(console.log).not.toHaveBeenCalled();
      ProgressiveKITT.debug(0);
      triggerDebugMessage();
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should turn on debug messages when called with a parameter that is true', function() {
      ProgressiveKITT.debug(false);
      ProgressiveKITT.debug(1);
      triggerDebugMessage();
      expect(console.log).toHaveBeenCalledTimes(1);
      ProgressiveKITT.debug(false);
      ProgressiveKITT.debug(true);
      triggerDebugMessage();
      expect(console.log).toHaveBeenCalledTimes(2);
    });

  });


})();
