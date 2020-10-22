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
  let adsList;
  const addPins = function (ads) {
    const fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      const index = ads.indexOf(ad);
      const pin = createPin(ad);
      pin.setAttribute(`data-index`, index);
      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
    adsList = ads;
  };

  const deactivatePin = function () {
    const activePin = mapPins.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const mapPinClickHandler = function (evt) {
    let pin;
    if (evt.target.matches(`.map__pin:not(.map__pin--active):not(.map__pin--main)`)) {
      pin = evt.target;
      deactivatePin();
    } else if (evt.target.parentElement.matches(`.map__pin:not(.map__pin--active):not(.map__pin--main)`)) {
      pin = evt.target.parentElement;
      deactivatePin();
    } else {
      return;
    }
    pin.classList.add(`map__pin--active`);
    const index = pin.getAttribute(`data-index`);
    window.card.createCard(adsList[index]);
  };

  window.pin = {
    mapPins,
    addPins,
    mapPinClickHandler,
  };
})();
