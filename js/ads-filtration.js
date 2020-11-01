'use strict';

(function () {
  let ads = [];
  let activatedFilters = [];
  let activatedFeatures = [];

  const getFilterName = function (filter) {
    let name;
    if (filter.id.includes(`housing-`)) {
      name = filter.id.slice(8);
    } else if (filter.id.includes(`filter-`)) {
      name = `features`;
    }
    return name;
  };
  const checkPrice = function (filter, price) {
    let isPriceActual = false;
    if (filter.value === `middle` && price > 10000 && price < 50000) {
      isPriceActual = true;
    } else if (filter.value === `low` && price < 10000) {
      isPriceActual = true;
    } else if (filter.value === `high` && price > 50000) {
      isPriceActual = true;
    }
    return isPriceActual;
  };

  const checkFeatures = function (ad) {
    let isAdActual = activatedFeatures.every(function (feature) {
      return ad.offer.features.includes(feature);
    });
    return isAdActual;
  };

  const checkAdByFilter = function (filter, ad) {
    const filterName = getFilterName(filter);
    let isAdActual = false;
    if (filter.value === `any`) {
      isAdActual = true;
    } else if (filterName === `price`) {
      isAdActual = checkPrice(filter, ad.offer.price);
    } else if (filterName === `features`) {
      isAdActual = checkFeatures(ad);
    } else {
      isAdActual = String(ad.offer[filterName]) === filter.value ? true : false;
    }
    return isAdActual;
  };

  const checkAdByFilters = function (filters, ad) {
    let isAdActual = false;
    if (filters.length === 0) {
      isAdActual = true;
    } else {
      isAdActual = filters.every(function (filter) {
        return checkAdByFilter(filter, ad);
      });
    }
    return isAdActual;
  };

  const updatePins = function () {
    let filteredAds = [];
    for (let i = 0; i < ads.length; i++) {
      if (checkAdByFilters(activatedFilters, ads[i])) {
        filteredAds.push(ads[i]);
      }
      if (filteredAds.length === window.pin.MAX_ADS_QUANTITY) {
        break;
      }
    }
    window.card.close();
    window.debounce(function () {
      window.pin.addPins(filteredAds);
    });
  };

  const mapFiltersInputHandler = function (evt) {
    if (evt.target.name === `features`) {
      if (!activatedFeatures.includes(evt.target.value)) {
        activatedFeatures.push(evt.target.value);
      } else {
        const index = activatedFeatures.indexOf(evt.target.value);
        activatedFeatures.splice(index, 1);
      }
    }
    if (!activatedFilters.includes(evt.target)) {
      activatedFilters.push(evt.target);
    } else if (evt.target.value === `any` && activatedFilters.includes(evt.target)) {
      const index = activatedFilters.indexOf(evt.target);
      activatedFilters.splice(index, 1);
    }
    updatePins();
  };

  window.adsFiltration = {
    getAds(data) {
      ads = data;
    },
    mapFiltersInputHandler,
  };
})();
