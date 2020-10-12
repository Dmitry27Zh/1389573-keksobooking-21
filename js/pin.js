'use strict';

(function () {
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const createPin = function (ad) {
    const mapPin = templatePin.cloneNode(true);
    mapPin.style = `left: ${ad.location.x - 62 / 2}px; top: ${ad.location.y - 70}px;`;
    mapPin.querySelector(`img`).src = ad.author.avatar;
    mapPin.querySelector(`img`).alt = ad.offer.title;
    return mapPin;
  };

  const addPins = function (array) {
    const fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(createPin(item));
    });
    return fragment;
  };

  window.pin = {
    addPins,
  };
})();
