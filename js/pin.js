'use strict';

(function () {
  const mapPins = document.querySelector(`.map__pins`);
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAX_ADS_QUANTITY = 5;

  const createPin = function (ad) {
    const mapPin = templatePin.cloneNode(true);
    mapPin.style = `left: ${ad.location.x - 62 / 2}px; top: ${ad.location.y - 70}px;`;
    mapPin.querySelector(`img`).src = ad.author.avatar;
    mapPin.querySelector(`img`).alt = ad.offer.title;
    return mapPin;
  };
  let adsList = [];
  const addPins = function (ads) {
    const fragment = document.createDocumentFragment();
    const adsQuantity = ads.length > MAX_ADS_QUANTITY ? MAX_ADS_QUANTITY : ads.length;
    for (let i = 0; i < adsQuantity; i++) {
      const pin = createPin(ads[i]);
      pin.setAttribute(`data-index`, i);
      fragment.appendChild(pin);
    }
    removePins();
    mapPins.appendChild(fragment);
    adsList = ads;
    console.log(adsList)
  };

  const removePins = function () {
    const mapPinsList = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    mapPinsList.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
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
    adsList,
    mapPinClickHandler,
  };
})();
