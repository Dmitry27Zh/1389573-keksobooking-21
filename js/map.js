'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);

  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersList = mapFilters.querySelectorAll(`.map__filter`);
  const mapFeaturesFieldset = mapFilters.querySelector(`.map__features`);

  let createdPopup;
  let popupClose;
  let currentTarget;

  const openCard = function (evt) {
    currentTarget = evt.currentTarget;
    currentTarget.removeEventListener(`click`, mapPinClickHandler);
    currentTarget.classList.add(`.map__pin--active`);
    const index = Array.from(mapPinsList).indexOf(currentTarget);
    createdPopup = window.card.createPopup(window.data.ads[index]);
    map.insertBefore(createdPopup, mapFiltersContainer);
    popupClose = createdPopup.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, popupCloseClickHadnler);
    document.addEventListener(`keydown`, popupKeydownHandler);
  };

  const closeCard = function () {
    currentTarget.classList.remove(`.map__pin--active`);
    currentTarget.addEventListener(`click`, mapPinClickHandler);
    map.removeChild(createdPopup);
    createdPopup = undefined;
    popupClose.removeEventListener(`click`, popupCloseClickHadnler);
    document.removeEventListener(`keydown`, popupKeydownHandler);
  };

  const popupCloseClickHadnler = function () {
    closeCard();
  };

  const popupKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, closeCard);
  };

  const mapPinClickHandler = function (evt) {
    if (createdPopup) {
      closeCard();
    }
    openCard(evt);
  };

  const disableMap = function () {
    for (let i = 0; i < mapFiltersList.length; i++) {
      mapFiltersList[i].setAttribute(`disabled`, `true`);
    }
    mapFeaturesFieldset.setAttribute(`disabled`, `true`);
  };

  let mapPinsList;

  const enableMap = function () {
    map.classList.remove(`map--faded`);
    window.mapPinMain.activate();
    for (let i = 0; i < mapFiltersList.length; i++) {
      mapFiltersList[i].removeAttribute(`disabled`);
    }
    mapFeaturesFieldset.removeAttribute(`disabled`);
    mapPins.appendChild(window.pin.addPins(window.data.ads));
    mapPinsList = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < mapPinsList.length; i++) {
      mapPinsList[i].addEventListener(`click`, mapPinClickHandler);
    }
  };

  window.map = {
    element: map,
    mapPins,
    disableMap,
    enableMap,
  };
})();
