'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = window.pin.mapPins;
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
    window.backend.load(onSuccessLoad, showLoadErrorMessage);
    mapPins.addEventListener(`click`, window.pin.mapPinClickHandler);
  };

  const onTypeFilterChange = function () {
    window.adsFiltration.updatePins(document.querySelector(`#housing-type`));
  };

  const onRoomsFilterChange = function () {
    window.adsFiltration.updatePins(document.querySelector(`#housing-rooms`));
  };

  const onGuestsFilterChange = function () {
    window.adsFiltration.updatePins(document.querySelector(`#housing-guests`));
  };

  const onPriceFilterChange = function () {
    window.adsFiltration.updatePins(document.querySelector(`#housing-price`));
  };

  const onSuccessLoad = function (data) {
    window.adsFiltration.getAds(data);
    window.pin.addPins(data);
    map.classList.remove(`map--faded`);
    mapFiltersList.forEach(function (filter) {
      filter.removeAttribute(`disabled`);
    });
    mapFeaturesFieldset.removeAttribute(`disabled`);
    mapFilters.querySelector(`#housing-type`).addEventListener(`input`, onTypeFilterChange);
    document.querySelector(`#housing-rooms`).addEventListener(`input`, onRoomsFilterChange);
    document.querySelector(`#housing-guests`).addEventListener(`input`, onGuestsFilterChange);
    document.querySelector(`#housing-price`).addEventListener(`input`, onPriceFilterChange);
    const checkBoxList = document.querySelectorAll(`.map__checkbox`);
    for (let checkBox of checkBoxList) {
      checkBox.addEventListener(`input`, function () {
        window.adsFiltration.updatePins(checkBox);
      });
    }
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
