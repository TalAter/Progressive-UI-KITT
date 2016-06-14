(function() {
  "use strict";

  describe('ProgressiveKITT.vroom', function() {

    it('should add a visible gui to the DOM inside a div#progressivekitt-ui', function () {
      expect(getWrappers()).toHaveLength(0);
      ProgressiveKITT.vroom();
      expect(getWrappers()).toHaveLength(1);
      expect(getWrapper()).toBeInDOM();
      expect(getWrapper()).toBeVisible();
    });

    it('should not attach a style sheet if non was defined', function () {
      ProgressiveKITT.vroom();
      expect(getStyleSheets()).toHaveLength(0);
    });

    it('should attach a style sheet if one was defined with ProgressiveKITT.setStyle', function () {
      ProgressiveKITT.setStylesheet('flat.css');
      ProgressiveKITT.vroom();
      expect(getStyleSheets()).toHaveLength(1);
      expect(getStyleSheet().id).toEqual('progressivekitt-style-sheet');
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

})();
