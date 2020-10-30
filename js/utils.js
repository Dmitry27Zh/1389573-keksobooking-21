'use strict';

(function () {
  const KEY_OPEN = `Enter`;
  const KEY_CLOSE = `Escape`;
  const MOUSE_LEFT_BUTTON = 0;

  const isEnterEvent = function (evt, action) {
    if (evt.key === KEY_OPEN) {
      action();
    }
  };

  const isEscEvent = function (evt, action) {
    if (evt.key === KEY_CLOSE) {
      action();
    }
  };

  const isMousedownEvent = function (evt, action) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      action();
    }
  };

  const getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const shuffleArray = function (array) {
    const itemsQuantity = getRandomIntInclusive(1, array.length);
    let newArray = array.slice(0, itemsQuantity);
    let currentIndex = newArray.length - 1;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = getRandomIntInclusive(0, currentIndex);
      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
      currentIndex--;
    }
    return newArray;
  };

  window.utils = {
    isEnterEvent,
    isEscEvent,
    isMousedownEvent,
    getRandomIntInclusive,
    shuffleArray,
  };
})();
