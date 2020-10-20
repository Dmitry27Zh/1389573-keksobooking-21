'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersList = mapFilters.querySelectorAll(`.map__filter`);
  const mapFeaturesFieldset = mapFilters.querySelector(`.map__features`);

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
    window.backend.load(window.pin.addPins, window.utils.showErrorMessage);
    mapPins.addEventListener(`click`, window.pin.mapPinClickHandler);
  };

  window.map = {
    element: map,
    mapFiltersContainer,
    mapPins,
    disableMap,
    enableMap,
  };
})();
