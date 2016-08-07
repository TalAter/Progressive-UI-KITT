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

  });

})();
