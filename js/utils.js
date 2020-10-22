'use strict';

(function () {
  const KEY_OPEN = `Enter`;
  const KEY_CLOSE = `Escape`;
  const MOUSE_LEFT_BUTTON = 0;
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

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

  const showSaveErrorMessage = function (message) {
    const errorElement = errorTemplate.cloneNode(`true`);
    errorElement.querySelector(`.error__message`).textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);
  };

  const showLoadErrorMessage = function (message) {
    const errorElement = document.createElement(`div`);
    errorElement.style = `z-index: 100; padding: 5px; border: 2px solid red; color: red; font-weight: bold`;
    errorElement.style.position = `absolute`;
    errorElement.style.top = `100px`;
    errorElement.style.left = `50%`;
    errorElement.style.transform = `translateX(-50%)`;
    errorElement.style.fontSize = `30px`;
    errorElement.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);
  };


  window.utils = {
    isEnterEvent,
    isEscEvent,
    isMousedownEvent,
    getRandomIntInclusive,
    shuffleArray,
    showLoadErrorMessage,
    showSaveErrorMessage,
  };
})();
