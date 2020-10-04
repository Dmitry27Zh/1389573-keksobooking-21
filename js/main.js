'use strict';

const ADS_QUANTITY = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const IMG_SOURCES = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP__PIN_MAIN_WIDTH = 62;
const MAP__PIN_MAIN_HEIGHT = 62;
const MAP__PIN_MAIN_POINTER = 22;

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

const shuffleArray = function (array) {
  const itemsQuantity = getRandomIntInclusive(1, array.length);
  let newArray = array.slice(0, itemsQuantity);
  let currentIndex = newArray.length - 1;
  let temporaryValue;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = getRandomIntInclusive(0, currentIndex);
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
    currentIndex--;
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
  this.features = shuffleArray(FEATURES);
  this.description = `описание`;
  this.photos = shuffleArray(IMG_SOURCES);
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
  mapPin.querySelector(`img`).src = ad.author.avatar;
  mapPin.querySelector(`img`).alt = ad.offer.title;
  return mapPin;
};

const addPins = function (array) {
  let fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });
  return fragment;
};

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsetList = adForm.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersList = mapFilters.querySelectorAll(`.map__filter`);
const mapFeaturesFieldset = mapFilters.querySelector(`.map__features`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);

const getCoordinate = function (value) {
  return Math.round(parseInt(value, 10));
};
const addAddress = function () {
  const addressInput = adForm.querySelector(`input[name="address"]`);
  const x = getCoordinate(mapPinMain.style.left) + MAP__PIN_MAIN_WIDTH / 2;
  let y = getCoordinate(mapPinMain.style.top) + MAP__PIN_MAIN_HEIGHT / 2;
  if (!map.classList.contains(`map--faded`)) {
    y += MAP__PIN_MAIN_HEIGHT / 2 + MAP__PIN_MAIN_POINTER;
  }
  addressInput.value = `${x}, ${y}`;
};

const disableElements = function () {
  for (let i = 0; i < adFormFieldsetList.length; i++) {
    adFormFieldsetList[i].setAttribute(`disabled`, `disabled`);
  }
  for (let i = 0; i < mapFiltersList.length; i++) {
    mapFiltersList[i].setAttribute(`disabled`, `disabled`);
  }
  mapFeaturesFieldset.setAttribute(`disabled`, `disabled`);
  addAddress();
};

disableElements();

const activateElements = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adFormFieldsetList.length; i++) {
    adFormFieldsetList[i].removeAttribute(`disabled`, `disabled`);
  }
  for (let i = 0; i < mapFiltersList.length; i++) {
    mapFiltersList[i].removeAttribute(`disabled`, `disabled`);
  }
  mapFeaturesFieldset.removeAttribute(`disabled`, `disabled`);
  let ads = generateAds();
  addPins(ads);
  mapPins.appendChild(addPins(ads));
  addAddress();
};

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    activateElements();
  }
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    activateElements();
  }
});

const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

const getInvalidCapacityOptions = function () {
  let invalidOptions;
  if (roomNumber.value === `1`) {
    invalidOptions = capacity.querySelectorAll(`option:not([value="1"])`);
  }
  if (roomNumber.value === `2`) {
    invalidOptions = capacity.querySelectorAll(`option:not([value="2"]):not([value="1"])`);
  }
  if (roomNumber.value === `3`) {
    invalidOptions = capacity.querySelectorAll(`option[value="0"]`);
  }
  if (roomNumber.value === `100`) {
    invalidOptions = capacity.querySelectorAll(`option:not([value="0"])`);
  }
  return invalidOptions;
};

let invalidOptions = getInvalidCapacityOptions();

roomNumber.addEventListener(`input`, function () {
  invalidOptions = getInvalidCapacityOptions();
});

const setCapacityValidity = function () {
  capacity.setCustomValidity(``);
  for (let i = 0; i < invalidOptions.length; i++) {
    if (invalidOptions[i].value === capacity.value) {
      capacity.setCustomValidity(`Не допустимый вариант`);
    }
  }
  capacity.reportValidity();
};

setCapacityValidity();

capacity.addEventListener(`input`, function () {
  setCapacityValidity();
});
