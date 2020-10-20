'use strict';

(function () {
  const templateCard = document.querySelector(`#card`).content.querySelector(`.popup`);

  const Types = {
    PALACE: `Дворец`,
    FLAT: `Квартира`,
    HOUSE: `Дом`,
    BUNGALOW: `Бунгало`,
  };

  const createCard = function (ad) {
    const openedCard = window.map.element.querySelector(`.popup`);
    if (openedCard) {
      closeCard(openedCard);
    }
    const mapPopup = templateCard.cloneNode(true);
    mapPopup.querySelector(`.popup__avatar`).src = ad.author.avatar;
    mapPopup.querySelector(`.popup__title`).textContent = ad.offer.title;
    mapPopup.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    mapPopup.querySelector(`.popup__text--price`).textContent = ad.offer.price;
    mapPopup.querySelector(`.popup__type`).textContent = Types[ad.offer.type.toUpperCase()];
    mapPopup.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    mapPopup.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    const features = mapPopup.querySelectorAll(`.popup__feature`);
    for (let feature of features) {
      feature.classList.add(`hidden`);
    }
    ad.offer.features.forEach(function (feature) {
      mapPopup.querySelector(`.popup__feature--${feature}`).classList.remove(`hidden`);
    });
    mapPopup.querySelector(`.popup__description`).textContent = ad.offer.description;
    const popupPhotos = mapPopup.querySelector(`.popup__photos`);
    const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
    popupPhotos.removeChild(popupPhoto);
    ad.offer.photos.forEach(function (photo) {
      const popupPhotoCopy = popupPhoto.cloneNode(true);
      popupPhotoCopy.src = photo;
      popupPhotos.appendChild(popupPhotoCopy);
    });

    const popupClose = mapPopup.querySelector(`.popup__close`);
    const popupCloseClickHadnler = function () {
      closeCard(mapPopup);
      popupClose.removeEventListener(`click`, popupCloseClickHadnler);
    };
    const popupKeydownHandler = function (evt) {
      window.utils.isEscEvent(evt, function () {
        closeCard(mapPopup);
        document.removeEventListener(`keydown`, popupKeydownHandler);
      });
    };
    popupClose.addEventListener(`click`, popupCloseClickHadnler);
    document.addEventListener(`keydown`, popupKeydownHandler);
    window.map.element.insertBefore(mapPopup, window.map.mapFiltersContainer);
  };

  const closeCard = function (card) {
    window.map.element.removeChild(card);
  };

  window.card = {
    createCard,
  };
})();
