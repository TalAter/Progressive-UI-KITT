(function() {
  "use strict";

  describe('puikitt.vroom', function() {

    it('should add a visible gui to the DOM inside a div#puikitt-ui', function () {
      expect(getWrappers()).toHaveLength(0);
      puikitt.vroom();
      expect(getWrappers()).toHaveLength(1);
      expect(getWrapper()).toBeInDOM();
      expect(getWrapper()).toBeVisible();
    });

    it('should not attach a style sheet if non was defined', function () {
      puikitt.vroom();
      expect(getStyleSheets()).toHaveLength(0);
    });

    it('should attach a style sheet if one was defined with puikitt.setStyle', function () {
      puikitt.setStylesheet('flat.css');
      puikitt.vroom();
      expect(getStyleSheets()).toHaveLength(1);
      expect(getStyleSheet().id).toEqual('puikitt-style-sheet');
      expect(getStyleSheet().rel).toEqual('stylesheet');
      expect(getStyleSheet().href).toContain('flat.css');
    });

  });

  describe('puikitt.setStylesheet', function() {

    it('should be callable and return undefined', function () {
      expect(puikitt.setStylesheet()).toBe(undefined);
    });

    it('should change the stylesheet every time it is called after gui was rendered', function () {
      puikitt.vroom();
      puikitt.setStylesheet('style1.css');
      expect(getStyleSheets()).toHaveLength(1);
      expect(getStyleSheet().href).toContain('style1.css');
      puikitt.setStylesheet('style2.css');
      expect(getStyleSheets()).toHaveLength(1);
      expect(getStyleSheet().href).not.toContain('style1.css');
      expect(getStyleSheet().href).toContain('style2.css');
    });

  });

})();
