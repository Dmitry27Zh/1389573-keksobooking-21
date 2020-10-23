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
    window.backend.load(window.pin.addPins, showLoadErrorMessage);
    mapPins.addEventListener(`click`, window.pin.mapPinClickHandler);
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

  window.map = {
    element: map,
    mapFiltersContainer,
    mapPins,
    disableMap,
    enableMap,
  };
})();
