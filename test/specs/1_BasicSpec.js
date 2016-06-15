(function() {
  "use strict";

  describe('ProgressiveKITT', function() {

    it('should exist in global namespace', function () {
      expect(ProgressiveKITT).toEqual(jasmine.any(Object));
    });

    it('should contain setStylesheet method', function () {
      expect(ProgressiveKITT.setStylesheet).toEqual(jasmine.any(Function));
    });

    it('should contain vroom method', function () {
      expect(ProgressiveKITT.vroom).toEqual(jasmine.any(Function));
    });

    it('should contain render method', function () {
      expect(ProgressiveKITT.render).toEqual(jasmine.any(Function));
    });

    it('should contain addMessage method', function () {
      expect(ProgressiveKITT.addMessage).toEqual(jasmine.any(Function));
    });

    it('should contain deleteMessages method', function () {
      expect(ProgressiveKITT.deleteMessages).toEqual(jasmine.any(Function));
    });

    it('should contain show method', function () {
      expect(ProgressiveKITT.show).toEqual(jasmine.any(Function));
    });

    it('should contain hide method', function () {
      expect(ProgressiveKITT.hide).toEqual(jasmine.any(Function));
    });

    xit('should contain debug method', function () {
      expect(ProgressiveKITT.debug).toEqual(jasmine.any(Function));
    });

    it('should not expose private methods', function () {
      expect(ProgressiveKITT._createGUI).toBe(undefined);
      expect(ProgressiveKITT._updateStylesheet).toBe(undefined);
      expect(ProgressiveKITT._guiCreated).toBe(undefined);
      expect(ProgressiveKITT._addMessage).toBe(undefined);
    });

  });

})();
