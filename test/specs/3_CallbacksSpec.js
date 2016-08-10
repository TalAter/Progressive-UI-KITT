(function() {
  "use strict";

  describe('ProgressiveKITT.addCallback', function() {

    it('should always return undefined', function() {
      expect(ProgressiveKITT.addCallback()).toEqual(undefined);
      expect(ProgressiveKITT.addCallback('blergh')).toEqual(undefined);
      expect(ProgressiveKITT.addCallback('show-message')).toEqual(undefined);
      expect(ProgressiveKITT.addCallback('show-message', function() {})).toEqual(undefined);
      expect(ProgressiveKITT.addCallback('show-message', function() {}, this)).toEqual(undefined);
    });

    it('should be able to register multiple callbacks to one event', function() {
      var spyOnShowMsg = jasmine.createSpy();
      var spyOnShowMsg2 = jasmine.createSpy();
      ProgressiveKITT.addCallback('show-message', spyOnShowMsg);
      ProgressiveKITT.addCallback('show-message', spyOnShowMsg2);
      expect(spyOnShowMsg).not.toHaveBeenCalled();
      expect(spyOnShowMsg2).not.toHaveBeenCalled();
      ProgressiveKITT.addMessage("Next time you want to stab me in the back, have the guts to do it to my face");
      expect(spyOnShowMsg).toHaveBeenCalledTimes(1);
      expect(spyOnShowMsg2).toHaveBeenCalledTimes(1);
    });

    it('should run callback in the context of ProgressiveKITT by default', function() {
      ProgressiveKITT.variableChanged = false;
      var changeVariable = function() {
        ProgressiveKITT.variableChanged = true;
      };
      ProgressiveKITT.addCallback('show-message', changeVariable);
      ProgressiveKITT.addMessage("Man walks down the street in a hat like that, you know he's not afraid of anything");
      expect(ProgressiveKITT.variableChanged).toEqual(true);

    });

    it('should run callbacks in the context given as the third parameter', function() {
      this.variableChanged = false;
      var changeVariable = function() {
        this.variableChanged = true;
      };
      ProgressiveKITT.addCallback('show-message', changeVariable, this);
      ProgressiveKITT.addMessage("Curse your sudden but inevitable betrayal");
      expect(this.variableChanged).toEqual(true);
    });

    describe("ProgressiveKITT.addCallback('show-message')", function() {

      it('should add a callback which will be called when a message is shown', function() {
        var spyOnShowMsg = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-message', spyOnShowMsg);
        expect(spyOnShowMsg).not.toHaveBeenCalled();
        ProgressiveKITT.addMessage("Curse your sudden but inevitable betrayal");
        expect(spyOnShowMsg).toHaveBeenCalledTimes(1);
      });

      it('should not fire callback when alert is shown', function() {
        var spyOnShowMsg = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-message', spyOnShowMsg);
        ProgressiveKITT.addAlert("Curse your sudden but inevitable betrayal");
        expect(spyOnShowMsg).not.toHaveBeenCalled();
      });

      it('should not fire callback when confirm is shown', function() {
        var spyOnShowMsg = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-message', spyOnShowMsg);
        ProgressiveKITT.addConfirm("Curse your sudden but inevitable betrayal");
        expect(spyOnShowMsg).not.toHaveBeenCalled();
      });

    });

    describe("ProgressiveKITT.addCallback('show-alert')", function() {

      it('should add a callback which will be called when an alert is shown', function() {
        var spyOnShowAlert = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-alert', spyOnShowAlert);
        expect(spyOnShowAlert).not.toHaveBeenCalled();
        ProgressiveKITT.addAlert("Curse your sudden but inevitable betrayal");
        expect(spyOnShowAlert).toHaveBeenCalledTimes(1);
      });

      it('should not fire callback when message is shown', function() {
        var spyOnShowAlert = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-alert', spyOnShowAlert);
        ProgressiveKITT.addMessage("Curse your sudden but inevitable betrayal");
        expect(spyOnShowAlert).not.toHaveBeenCalled();
      });

      it('should not fire callback when confirm is shown', function() {
        var spyOnShowAlert = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-alert', spyOnShowAlert);
        ProgressiveKITT.addConfirm("Curse your sudden but inevitable betrayal");
        expect(spyOnShowAlert).not.toHaveBeenCalled();
      });

    });

    describe("ProgressiveKITT.addCallback('show-confirm')", function() {

      it('should add a callback which will be called when a confirm is shown', function() {
        var spyOnShowConfirm = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-confirm', spyOnShowConfirm);
        expect(spyOnShowConfirm).not.toHaveBeenCalled();
        ProgressiveKITT.addConfirm("Curse your sudden but inevitable betrayal");
        expect(spyOnShowConfirm).toHaveBeenCalledTimes(1);
      });

      it('should not fire callback when message is shown', function() {
        var spyOnShowConfirm = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-confirm', spyOnShowConfirm);
        ProgressiveKITT.addMessage("Curse your sudden but inevitable betrayal");
        expect(spyOnShowConfirm).not.toHaveBeenCalled();
      });

      it('should not fire callback when an alert is shown', function() {
        var spyOnShowConfirm = jasmine.createSpy();
        ProgressiveKITT.addCallback('show-confirm', spyOnShowConfirm);
        ProgressiveKITT.addAlert("Curse your sudden but inevitable betrayal");
        expect(spyOnShowConfirm).not.toHaveBeenCalled();
      });

    });

    describe("ProgressiveKITT.addCallback('hide-message')", function() {

      beforeEach(function() {
        jasmine.clock().install();
      });

      afterEach(function() {
        jasmine.clock().tick(200000);
        jasmine.clock().uninstall();
      });

      it('should add a callback which will be called when a message is hidden', function() {
        var spyOnHideMessage = jasmine.createSpy();
        ProgressiveKITT.addCallback('hide-message', spyOnHideMessage);
        expect(spyOnHideMessage).not.toHaveBeenCalled();
        ProgressiveKITT.addMessage("Curse your sudden but inevitable betrayal", { hideAfter: 5000});
        jasmine.clock().tick(6000);
        expect(spyOnHideMessage).toHaveBeenCalledTimes(1);
      });

      it('should add a callback which will be called when an alert is hidden', function() {
        var spyOnHideAlert = jasmine.createSpy();
        ProgressiveKITT.addCallback('hide-message', spyOnHideAlert);
        expect(spyOnHideAlert).not.toHaveBeenCalled();
        ProgressiveKITT.addAlert("Curse your sudden but inevitable betrayal", "OK", function() {}, { hideAfter: 5000});
        jasmine.clock().tick(6000);
        expect(spyOnHideAlert).toHaveBeenCalledTimes(1);
      });

      it('should add a callback which will be called when a confirm is hidden', function() {
        var spyOnHideConfirm = jasmine.createSpy();
        ProgressiveKITT.addCallback('hide-message', spyOnHideConfirm);
        expect(spyOnHideConfirm).not.toHaveBeenCalled();
        ProgressiveKITT.addConfirm("Curse your sudden but inevitable betrayal", "OK", function() {}, "Cancel", function() {}, { hideAfter: 5000});
        jasmine.clock().tick(6000);
        expect(spyOnHideConfirm).toHaveBeenCalledTimes(1);
      });

    });

  });

  describe('ProgressiveKITT.removeCallback', function() {

    var spy1;
    var spy2;
    var spy3;
    var spy4;

    beforeEach(function() {
      spy1 = jasmine.createSpy();
      spy2 = jasmine.createSpy();
      spy3 = jasmine.createSpy();
      spy4 = jasmine.createSpy();
    });

    it('should always return undefined', function() {
      expect(ProgressiveKITT.removeCallback()).toEqual(undefined);
      expect(ProgressiveKITT.removeCallback('blergh')).toEqual(undefined);
      expect(ProgressiveKITT.removeCallback('show-message', function() {})).toEqual(undefined);
    });

    it('should delete all callbacks on all event types if passed undefined as the first parameter', function() {
      ProgressiveKITT.addCallback('show-message', spy1);
      ProgressiveKITT.addCallback('show-message', spy2);
      ProgressiveKITT.addCallback('show-alert', spy3);
      ProgressiveKITT.addCallback('show-alert', spy4);
      ProgressiveKITT.removeCallback();
      ProgressiveKITT.addMessage("Well, my time of not taking you seriously is coming to a middle");
      ProgressiveKITT.addAlert("You can't take the sky from me");
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
      expect(spy3).not.toHaveBeenCalled();
      expect(spy4).not.toHaveBeenCalled();
    });

    it('should delete all callbacks on an event type if passed the event name as the first parameter and undefined as the second parameter', function() {
      ProgressiveKITT.addCallback('show-message', spy1);
      ProgressiveKITT.addCallback('show-message', spy2);
      ProgressiveKITT.addCallback('show-alert', spy3);
      ProgressiveKITT.addCallback('show-alert', spy4);
      ProgressiveKITT.removeCallback('show-message');
      ProgressiveKITT.addMessage("Well, my time of not taking you seriously is coming to a middle");
      ProgressiveKITT.addAlert("You can't take the sky from me");
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
      expect(spy3).toHaveBeenCalledTimes(1);
      expect(spy4).toHaveBeenCalledTimes(1);
    });

    it('should delete all callbacks on an event type passed as first parameter, and matching a function passed as the second parameter', function() {
      ProgressiveKITT.addCallback('show-message', spy1);
      ProgressiveKITT.addCallback('show-message', spy2);
      ProgressiveKITT.addCallback('show-alert', spy3);
      ProgressiveKITT.addCallback('show-alert', spy4);
      ProgressiveKITT.removeCallback('show-message', spy2);
      ProgressiveKITT.addMessage("Well, my time of not taking you seriously is coming to a middle");
      ProgressiveKITT.addAlert("You can't take the sky from me");
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).not.toHaveBeenCalled();
      expect(spy3).toHaveBeenCalledTimes(1);
      expect(spy4).toHaveBeenCalledTimes(1);
    });

    it('should delete all callbacks matching a function passed as the second parameter on all event types if first parameter is undefined', function() {
      ProgressiveKITT.addCallback('show-message', spy1);
      ProgressiveKITT.addCallback('show-message', spy2);
      ProgressiveKITT.addCallback('show-alert', spy1);
      ProgressiveKITT.addCallback('show-alert', spy2);
      ProgressiveKITT.removeCallback(undefined, spy1);
      ProgressiveKITT.addMessage("Well, my time of not taking you seriously is coming to a middle");
      ProgressiveKITT.addAlert("You can't take the sky from me");
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledTimes(2);
    });

  });

})();
