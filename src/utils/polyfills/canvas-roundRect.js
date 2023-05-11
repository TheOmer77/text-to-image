 /* eslint-disable */ 
/*
 * Implements the .roundRect() method of the CanvasPath mixin
 * as introduced by https://github.com/whatwg/html/pull/6765
 * Source: https://github.com/Kaiido/roundRect/blob/main/roundRect.js
 * Parsed by Babel for Chrome 70.
 */
(() => {
  'use strict';

  var _Path2D$prototype, _Path2D$prototype$rou;
  (_Path2D$prototype$rou = (_Path2D$prototype = Path2D.prototype).roundRect) !== null && _Path2D$prototype$rou !== void 0 ? _Path2D$prototype$rou : _Path2D$prototype.roundRect = roundRect;
  if (window.CanvasRenderingContext2D) {
    var _window$CanvasRen, _window$CanvasRen2;
    (_window$CanvasRen2 = (_window$CanvasRen = window.CanvasRenderingContext2D.prototype).roundRect) !== null && _window$CanvasRen2 !== void 0 ? _window$CanvasRen2 : _window$CanvasRen.roundRect = roundRect;
  }
  if (window.OffscreenCanvasRenderingContext2D) {
    var _window$Offscreen, _window$Offscreen2;
    (_window$Offscreen2 = (_window$Offscreen = window.OffscreenCanvasRenderingContext2D.prototype).roundRect) !== null && _window$Offscreen2 !== void 0 ? _window$Offscreen2 : _window$Offscreen.roundRect = roundRect;
  }
  function roundRect(x, y, w, h, radii) {
    if (![x, y, w, h].every(input => Number.isFinite(input))) {
      return;
    }
    radii = parseRadiiArgument(radii);
    let upperLeft, upperRight, lowerRight, lowerLeft;
    if (radii.length === 4) {
      upperLeft = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[1]);
      lowerRight = toCornerPoint(radii[2]);
      lowerLeft = toCornerPoint(radii[3]);
    } else if (radii.length === 3) {
      upperLeft = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[1]);
      lowerLeft = toCornerPoint(radii[1]);
      lowerRight = toCornerPoint(radii[2]);
    } else if (radii.length === 2) {
      upperLeft = toCornerPoint(radii[0]);
      lowerRight = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[1]);
      lowerLeft = toCornerPoint(radii[1]);
    } else if (radii.length === 1) {
      upperLeft = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[0]);
      lowerRight = toCornerPoint(radii[0]);
      lowerLeft = toCornerPoint(radii[0]);
    } else {
      throw new RangeError(`${getErrorMessageHeader(this)} ${radii.length} is not a valid size for radii sequence.`);
    }
    const corners = [upperLeft, upperRight, lowerRight, lowerLeft];
    const negativeCorner = corners.find(({
      x,
      y
    }) => x < 0 || y < 0);
    const negativeValue = (negativeCorner === null || negativeCorner === void 0 ? void 0 : negativeCorner.x) < 0 ? negativeCorner.x : negativeCorner === null || negativeCorner === void 0 ? void 0 : negativeCorner.y;
    if (corners.some(({
      x,
      y
    }) => !Number.isFinite(x) || !Number.isFinite(y))) {
      return;
    }
    if (negativeCorner) {
      throw new RangeError(`${getErrorMessageHeader(this)} Radius value ${negativeCorner} is negative.`);
    }
    fixOverlappingCorners(corners);
    if (w < 0 && h < 0) {
      this.moveTo(x - upperLeft.x, y);
      this.ellipse(x + w + upperRight.x, y - upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI * 1.5, -Math.PI);
      this.ellipse(x + w + lowerRight.x, y + h + lowerRight.y, lowerRight.x, lowerRight.y, 0, -Math.PI, -Math.PI / 2);
      this.ellipse(x - lowerLeft.x, y + h + lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, -Math.PI / 2, 0);
      this.ellipse(x - upperLeft.x, y - upperLeft.y, upperLeft.x, upperLeft.y, 0, 0, -Math.PI / 2);
    } else if (w < 0) {
      this.moveTo(x - upperLeft.x, y);
      this.ellipse(x + w + upperRight.x, y + upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI / 2, -Math.PI, 1);
      this.ellipse(x + w + lowerRight.x, y + h - lowerRight.y, lowerRight.x, lowerRight.y, 0, -Math.PI, -Math.PI * 1.5, 1);
      this.ellipse(x - lowerLeft.x, y + h - lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, Math.PI / 2, 0, 1);
      this.ellipse(x - upperLeft.x, y + upperLeft.y, upperLeft.x, upperLeft.y, 0, 0, -Math.PI / 2, 1);
    } else if (h < 0) {
      this.moveTo(x + upperLeft.x, y);
      this.ellipse(x + w - upperRight.x, y - upperRight.y, upperRight.x, upperRight.y, 0, Math.PI / 2, 0, 1);
      this.ellipse(x + w - lowerRight.x, y + h + lowerRight.y, lowerRight.x, lowerRight.y, 0, 0, -Math.PI / 2, 1);
      this.ellipse(x + lowerLeft.x, y + h + lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, -Math.PI / 2, -Math.PI, 1);
      this.ellipse(x + upperLeft.x, y - upperLeft.y, upperLeft.x, upperLeft.y, 0, -Math.PI, -Math.PI * 1.5, 1);
    } else {
      this.moveTo(x + upperLeft.x, y);
      this.ellipse(x + w - upperRight.x, y + upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI / 2, 0);
      this.ellipse(x + w - lowerRight.x, y + h - lowerRight.y, lowerRight.x, lowerRight.y, 0, 0, Math.PI / 2);
      this.ellipse(x + lowerLeft.x, y + h - lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, Math.PI / 2, Math.PI);
      this.ellipse(x + upperLeft.x, y + upperLeft.y, upperLeft.x, upperLeft.y, 0, Math.PI, Math.PI * 1.5);
    }
    this.closePath();
    this.moveTo(x, y);
    function toDOMPointInit(value) {
      const {
        x,
        y,
        z,
        w
      } = value;
      return {
        x,
        y,
        z,
        w
      };
    }
    function parseRadiiArgument(value) {
      // https://webidl.spec.whatwg.org/#es-union
      // with 'optional (unrestricted double or DOMPointInit
      //   or sequence<(unrestricted double or DOMPointInit)>) radii = 0'
      const type = typeof value;
      if (type === 'undefined' || value === null) {
        return [0];
      }
      if (type === 'function') {
        return [NaN];
      }
      if (type === 'object') {
        if (typeof value[Symbol.iterator] === 'function') {
          return [...value].map(elem => {
            // https://webidl.spec.whatwg.org/#es-union
            // with '(unrestricted double or DOMPointInit)'
            const elemType = typeof elem;
            if (elemType === 'undefined' || elem === null) {
              return 0;
            }
            if (elemType === 'function') {
              return NaN;
            }
            if (elemType === 'object') {
              return toDOMPointInit(elem);
            }
            return toUnrestrictedNumber(elem);
          });
        }
        return [toDOMPointInit(value)];
      }
      return [toUnrestrictedNumber(value)];
    }
    function toUnrestrictedNumber(value) {
      return +value;
    }
    function toCornerPoint(value) {
      const asNumber = toUnrestrictedNumber(value);
      if (Number.isFinite(asNumber)) {
        return {
          x: asNumber,
          y: asNumber
        };
      }
      if (Object(value) === value) {
        var _value$x, _value$y;
        return {
          x: toUnrestrictedNumber((_value$x = value.x) !== null && _value$x !== void 0 ? _value$x : 0),
          y: toUnrestrictedNumber((_value$y = value.y) !== null && _value$y !== void 0 ? _value$y : 0)
        };
      }
      return {
        x: NaN,
        y: NaN
      };
    }
    function fixOverlappingCorners(corners) {
      const [upperLeft, upperRight, lowerRight, lowerLeft] = corners;
      const factors = [Math.abs(w) / (upperLeft.x + upperRight.x), Math.abs(h) / (upperRight.y + lowerRight.y), Math.abs(w) / (lowerRight.x + lowerLeft.x), Math.abs(h) / (upperLeft.y + lowerLeft.y)];
      const minFactor = Math.min(...factors);
      if (minFactor <= 1) {
        for (const radii of corners) {
          radii.x *= minFactor;
          radii.y *= minFactor;
        }
      }
    }
  }
  function getErrorMessageHeader(instance) {
    return `Failed to execute 'roundRect' on '${getConstructorName(instance)}':`;
  }
  function getConstructorName(instance) {
    return Object(instance) === instance && instance instanceof Path2D ? 'Path2D' : instance instanceof (window === null || window === void 0 ? void 0 : window.CanvasRenderingContext2D) ? 'CanvasRenderingContext2D' : instance instanceof (window === null || window === void 0 ? void 0 : window.OffscreenCanvasRenderingContext2D) ? 'OffscreenCanvasRenderingContext2D' : (instance === null || instance === void 0 ? void 0 : instance.constructor.name) || instance;
  }
})();