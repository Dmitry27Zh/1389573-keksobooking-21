'use strict';

(function () {
  const templateCard = document.querySelector(`#card`).content.querySelector(`.popup`);

  const createPopup = function (ad) {
    const mapPopup = templateCard.cloneNode(true);
    mapPopup.querySelector(`.popup__avatar`).src = ad.author.avatar;
    mapPopup.querySelector(`.popup__title`).textContent = ad.offer.title;
    mapPopup.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    mapPopup.querySelector(`.popup__text--price`).textContent = ad.offer.price;
    mapPopup.querySelector(`.popup__type`).textContent = ad.offer.type;
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
    return mapPopup;
  };

  window.card = {
    createPopup,
  };
})();
