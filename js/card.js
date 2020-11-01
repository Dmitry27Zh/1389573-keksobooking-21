'use strict';

(function () {
  const templateCard = document.querySelector(`#card`).content.querySelector(`.popup`);

  const Types = {
    PALACE: `Дворец`,
    FLAT: `Квартира`,
    HOUSE: `Дом`,
    BUNGALOW: `Бунгало`,
  };

  const getRoomsString = function (rooms) {
    let lastLetter = ``;
    if (rooms.toString().endsWith(`1`) && rooms !== 11) {
      lastLetter = `а`;
    }
    if (rooms.toString().endsWith(`2`) || rooms.toString().endsWith(`3`) || rooms.toString().endsWith(`4`)
      && rooms !== 12 && rooms !== 13 && rooms !== 14
    ) {
      lastLetter = `ы`;
    }
    return rooms === 0 ? `` : `${rooms} комнат${lastLetter}`;
  };

  const getGuestsString = function (guests) {
    let word = `гостей`;
    if (guests.toString().endsWith(`1`) && guests !== 11) {
      word = `гостя`;
    }
    return guests === 0 ? `не для гостей` : `для ${guests} ${word}`;
  };

  const createCard = function (ad) {
    closeCard();
    const mapPopup = templateCard.cloneNode(true);
    mapPopup.querySelector(`.popup__avatar`).src = ad.author.avatar;
    mapPopup.querySelector(`.popup__title`).textContent = ad.offer.title;
    mapPopup.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    mapPopup.querySelector(`.popup__text--price`).textContent = ad.offer.price;
    mapPopup.querySelector(`.popup__type`).textContent = Types[ad.offer.type.toUpperCase()];
    mapPopup.querySelector(`.popup__text--capacity`).textContent = `${getRoomsString(ad.offer.rooms)} ${getGuestsString(ad.offer.guests)}`;
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

    popupClose.addEventListener(`click`, popupCloseClickHadnler);
    document.addEventListener(`keydown`, popupKeydownHandler);
    window.map.element.insertBefore(mapPopup, window.map.mapFiltersContainer);
  };
  const popupCloseClickHadnler = function () {
    closeCard();
  };
  const popupKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, function () {
      closeCard();
    });
  };

  const closeCard = function () {
    const card = window.map.element.querySelector(`.popup`);
    if (card) {
      const closeButton = card.querySelector(`.popup__close`);
      closeButton.removeEventListener(`click`, popupCloseClickHadnler);
      document.removeEventListener(`keydown`, popupKeydownHandler);
      window.map.element.removeChild(card);
    }
  };

  window.card = {
    createCard,
    close: closeCard,
  };
})();
