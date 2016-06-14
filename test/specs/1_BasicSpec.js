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

    it('should not expose private methods', function () {
      expect(ProgressiveKITT._createGUI).toBe(undefined);
      expect(ProgressiveKITT._updateStylesheet).toBe(undefined);
      expect(ProgressiveKITT._guiCreated).toBe(undefined);
    });

  });

})();
