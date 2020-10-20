'use strict';

(function () {
  const mapPins = window.map.element.querySelector(`.map__pins`);

  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const createPin = function (ad) {
    const mapPin = templatePin.cloneNode(true);
    mapPin.style = `left: ${ad.location.x - 62 / 2}px; top: ${ad.location.y - 70}px;`;
    mapPin.querySelector(`img`).src = ad.author.avatar;
    mapPin.querySelector(`img`).alt = ad.offer.title;
    return mapPin;
  };

  const createPins = function (array) {
    const fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(createPin(item));
    });
    return fragment;
  };

  const addPins = function (array) {
    mapPins.appendChild(createPins(array));
  };

  const addPinsEvent = function () {
    mapPins.addEventListener(`click`, function (evt) {
      console.log(evt.target);
    });
  };

  window.pin = {
    mapPins,
    addPins,
    addPinsEvent,
  };
})();
