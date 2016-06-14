(function() {
  "use strict";

  describe('puikitt', function() {

    it('should exist in global namespace', function () {
      expect(puikitt).toEqual(jasmine.any(Object));
    });

    it('should contain setStylesheet method', function () {
      expect(puikitt.setStylesheet).toEqual(jasmine.any(Function));
    });

  });

})();
