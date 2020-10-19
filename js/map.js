'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersList = mapFilters.querySelectorAll(`.map__filter`);
  const mapFeaturesFieldset = mapFilters.querySelector(`.map__features`);

  const activateAdsViewing = function () {
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

    window.backend.load(window.pin.addPins, window.utils.showErrorMessage);
    const mapPinsList = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < mapPinsList.length; i++) {
      mapPinsList[i].addEventListener(`click`, mapPinClickHandler);
    }
  };

  const disableMap = function () {
    mapFiltersList.forEach(function (filter) {
      filter.setAttribute(`disabled`, true);
    });
    mapFeaturesFieldset.setAttribute(`disabled`, `true`);
  };

  const enableMap = function () {
    map.classList.remove(`map--faded`);
    mapFiltersList.forEach(function (filter) {
      filter.removeAttribute(`disabled`);
    });
    mapFeaturesFieldset.removeAttribute(`disabled`);
    activateAdsViewing();
  };

  window.map = {
    element: map,
    disableMap,
    enableMap,
  };
})();
