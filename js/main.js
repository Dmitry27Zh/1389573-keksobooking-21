'use strict';

const ADS_QUANTITY = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const IMG_SOURCES = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mapPinsWidth = parseInt(getComputedStyle(mapPins).width, 10);
const templateCard = document.querySelector(`#card`).content.querySelector(`.popup`);
const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArray = function (array) {
  const itemsQuantity = getRandomIntInclusive(1, array.length);
  let newArray = [];
  for (let i = 0; i < itemsQuantity; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

const Author = function (x) {
  this.avatar = `img/avatars/user0${x}.png`;
};

const Offer = function () {
  this.title = `заголовок`;
  this.address = `600, 350`;
  this.price = 100;
  this.type = TYPES[getRandomIntInclusive(0, TYPES.length - 1)];
  this.rooms = 3;
  this.guests = 3;
  this.checkin = TIMES[getRandomIntInclusive(0, TIMES.length - 1)];
  this.checkout = TIMES[getRandomIntInclusive(0, TIMES.length - 1)];
  this.features = getRandomArray(FEATURES);
  this.description = `описание`;
  this.photos = getRandomArray(IMG_SOURCES);
};

const Coordinates = function () {
  this.x = getRandomIntInclusive(1, mapPinsWidth - 1);
  this.y = getRandomIntInclusive(131, 629);
};

const Ad = function (x) {
  this.author = new Author(x);
  this.offer = new Offer();
  this.location = new Coordinates();
};

const generateAds = function () {
  let ads = [];
  for (let i = 1; i <= ADS_QUANTITY; i++) {
    let ad = new Ad(i);
    ads.push(ad);
  }
  return ads;
};

map.classList.remove(`map--faded`);
const createPopup = function (ad) {
  const mapPopup = templateCard.cloneNode(true);
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

const createPin = function (ad) {
  const mapPin = templatePin.cloneNode(true);
  mapPin.style = `left: ${ad.location.x - 62 / 2}px; top: ${ad.location.y - 70}px;`;
  mapPin.children[0].src = ad.author.avatar;
  mapPin.children[0].alt = ad.offer.title;
  return mapPin;
};

const addPins = function (array) {
  let fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });
  return fragment;
};

let ads = generateAds();
createPopup(ads[0]);

mapPins.appendChild(addPins(ads));
