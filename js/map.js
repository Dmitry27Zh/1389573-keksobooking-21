'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = window.pin.mapPins;
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersList = mapFilters.querySelectorAll(`.map__filter`);
  const mapFeaturesFieldset = mapFilters.querySelector(`.map__features`);

  const disableMap = function () {
    map.classList.add(`map--faded`);
    window.pin.removePins();
    window.card.close();
    mapFilters.reset();
    window.mapPinMain.deactivate();
    mapFiltersList.forEach(function (filter) {
      filter.setAttribute(`disabled`, true);
    });
    mapFeaturesFieldset.setAttribute(`disabled`, `true`);
    mapPins.removeEventListener(`click`, window.pin.mapPinClickHandler);
  };

  const enableMap = function () {
    window.backend.load(onSuccessLoad, showLoadErrorMessage);
    mapPins.addEventListener(`click`, window.pin.mapPinClickHandler);
  };

  const onSuccessLoad = function (data) {
    window.adsFiltration.getAds(data);
    window.pin.addPins(data);
    map.classList.remove(`map--faded`);
    mapFiltersList.forEach(function (filter) {
      filter.removeAttribute(`disabled`);
    });
    mapFeaturesFieldset.removeAttribute(`disabled`);
    mapFilters.addEventListener(`input`, window.adsFiltration.mapFiltersInputHandler);
  };


  const showLoadErrorMessage = function (message) {
    const errorElement = document.createElement(`div`);
    errorElement.style = `z - index: 100; padding: 5px; border: 2px solid red; color: red; font - weight: bold`;
    errorElement.style.position = `absolute`;
    errorElement.style.top = `100px`;
    errorElement.style.left = `50 % `;
    errorElement.style.transform = `translateX(-50 %)`;
    errorElement.style.fontSize = `30px`;
    errorElement.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);
  };

  window.map = {
    element: map,
    mapFiltersContainer,
    disableMap,
    enableMap,
  };
})();
