'use strict';

(function () {
  const moveSomething = function (evt, action) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    const onMouseMove = function (moveEvt) {
      const move = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      action(move);
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
    };
    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.move = {
    add: moveSomething,
  };
})();
