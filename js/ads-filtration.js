'use strict';

(function () {
  let ads = [];
  const mapFilters = document.querySelector(`.map__filters`);

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

  const checkFeature = function (filter, ad) {
    let isFeatureHere = false;
    if (filter.checked && ad.offer.features.includes(filter.value)) {
      isFeatureHere = true;
    }
    return isFeatureHere;
  };

  const checkAdByFilter = function (filter, ad) {
    const filterName = getFilterName(filter);
    let isAdActual = false;
    if (filter.value === `any`) {
      isAdActual = true;
    } else if (filterName === `price`) {
      isAdActual = checkPrice(filter, ad.offer.price);
    } else if (filterName === `features`) {
      isAdActual = checkFeature(filter, ad);
    } else {
      isAdActual = String(ad.offer[filterName]) === filter.value ? true : false;
    }
    return isAdActual;
  };

  const updatePins = function (filter) {
    let filteredAds = ads.filter(function (ad) {
      return checkAdByFilter(filter, ad);
    });
    window.card.close();
    window.pin.addPins(filteredAds);
  };

  window.adsFiltration = {
    getAds(data) {
      ads = data;
    },
    updatePins,
  };
})();
