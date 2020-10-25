'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = window.pin.mapPins;
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersList = mapFilters.querySelectorAll(`.map__filter`);
  const mapFeaturesFieldset = mapFilters.querySelector(`.map__features`);

  const filtersList = [
    {
      name: `type`,
      node: mapFilters.querySelector(`#housing-type`),
    },
    {
      name: `price`,
      node: mapFilters.querySelector(`#housing-price`),
      checkPrice(price) {
        let isPriceActual = false;
        if (this.node.value === `middle` && price > 10000 && price < 50000) {
          isPriceActual = true;
        } else if (this.node.value === `low` && price < 10000) {
          isPriceActual = true;
        } else if (this.node.value === `high` && price > 50000) {
          isPriceActual = true;
        }
        return isPriceActual;
      }
    },
    {
      name: `rooms`,
      node: mapFilters.querySelector(`#housing-rooms`),
    },
    {
      name: `guests`,
      node: mapFilters.querySelector(`#housing-guests`),
    },
    /* {
      name: `features`,
      node: mapFilters.querySelector(`#filter-wifi`),
    },
    {
      name: `features`,
      node: mapFilters.querySelector(`#filter-dishwasher`),
    },
    {
      name: `features`,
      node: mapFilters.querySelector(`#filter-parking`),
    },
    {
      name: `features`,
      node: mapFilters.querySelector(`#filter-washer`),
    },
    {
      name: `features`,
      node: mapFilters.querySelector(`#filter-elevator`),
    },
    {
      name: `features`,
      node: mapFilters.querySelector(`#filter-conditioner`),
    }, */
  ];

  const checkAdByFilters = function (ad) {
    return filtersList.every(function (filter) {
      let isAdActual = false;
      if (filter.node.value === `any`) {
        isAdActual = true;
      } else if (filter.name === `price`) {
        isAdActual = filter.checkPrice(ad.offer.price);
      } /* else if (filter.name === `features` && filter.node.checked) {
        console.log(`есть`)
      }  */else {
        isAdActual = String(ad.offer[filter.name]) === filter.node.value ? true : false;
      }
      return isAdActual;
    });
  };
  let ads = [];

  const updatePins = function () {
    let filteredAds = ads.filter(function (ad) {
      return checkAdByFilters(ad);
    });
    window.card.close();
    window.pin.addPins(filteredAds);
  };

  const onTypeFilterChange = function () {
    updatePins();
  };

  const onRoomsFilterChange = function () {
    updatePins();
  };

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

  const onSuccessLoad = function (data) {
    ads = data;
    console.log(data);
    window.pin.addPins(data);
    map.classList.remove(`map--faded`);
    mapFiltersList.forEach(function (filter) {
      filter.removeAttribute(`disabled`);
    });
    mapFeaturesFieldset.removeAttribute(`disabled`);
    filtersList[0].node.addEventListener(`input`, onTypeFilterChange);
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
