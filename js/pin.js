'use strict';

(function () {
  const mapPins = window.map.mapPins;
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
      const index = array.indexOf(item);
      const pin = createPin(item);
      pin.setAttribute(`data-index`, index);
      fragment.appendChild(pin);
    });
    return fragment;
  };

  const addPins = function (array) {
    mapPins.appendChild(createPins(array));
  };

  const mapPinClickHandler = function (evt) {
    const activePin = mapPins.querySelector(`.map__pin--active`);
    if (activePin && activePin !== evt.target && activePin !== evt.target.parentElement
      && evt.target.tagName === `IMG` && evt.target.parentElement.classList.contains(`map__pin`)) {
      activePin.classList.remove(`map__pin--active`);
    }
    let pin;
    if (evt.target.tagName === `IMG` && evt.target.parentElement.classList.contains(`map__pin`) &&
      !evt.target.parentElement.classList.contains(`map__pin--main`)) {
      pin = evt.target.parentElement;
    } else if (evt.target.classList.contains(`map__pin`) && !evt.target.classList.contains(`map__pin--main`)) {
      pin = evt.target;
    }
    if (!pin || evt.target.classList.contains(`map__pin--active`) ||
      evt.target.parentElement.classList.contains(`map__pin--active`)) {
      return;
    }
    pin.classList.add(`map__pin--active`);
    const index = pin.getAttribute(`data-index`);
    window.backend.load(window.card.createCard, window.utils.showErrorMessage, index);
  };

  window.pin = {
    mapPins,
    addPins,
    mapPinClickHandler,
  };
})();
