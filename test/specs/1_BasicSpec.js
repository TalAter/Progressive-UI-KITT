(function() {
  "use strict";

  describe('puikitt', function() {

    it('should exist in global namespace', function () {
      expect(puikitt).toEqual(jasmine.any(Object));
    });

    it('should contain setStylesheet method', function () {
      expect(puikitt.setStylesheet).toEqual(jasmine.any(Function));
    });

    it('should contain vroom method', function () {
      expect(puikitt.vroom).toEqual(jasmine.any(Function));
    });

    it('should contain render method', function () {
      expect(puikitt.render).toEqual(jasmine.any(Function));
    });

    it('should not expose private methods', function () {
      expect(puikitt._createGUI).toBe(undefined);
      expect(puikitt._updateStylesheet).toBe(undefined);
      expect(puikitt._guiCreated).toBe(undefined);
    });

  });

})();
