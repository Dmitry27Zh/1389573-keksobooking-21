'use strict';

const ADS_QUANTITY = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const IMG_SOURCES = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const KEY_OPEN = `Enter`;
const KEY_CLOSE = `Escape`;
const MOUSE_MAIN_BUTTON = 0;

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
  this.rooms = 1;
  this.guests = 1;
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

const createPin = function (ad) {
  const mapPin = templatePin.cloneNode(true);
  mapPin.style = `left: ${ad.location.x - 62 / 2}px; top: ${ad.location.y - 70}px;`;
  mapPin.querySelector(`img`).src = ad.author.avatar;
  mapPin.querySelector(`img`).alt = ad.offer.title;
  return mapPin;
};

const addPins = function (array) {
  const fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });
  return fragment;
};

const ads = generateAds();
const adForm = document.querySelector(`.ad-form`);
const adFormFieldsetList = adForm.querySelectorAll(`fieldset`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
const mapFiltersList = mapFilters.querySelectorAll(`.map__filter`);
const mapFeaturesFieldset = mapFilters.querySelector(`.map__features`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const mapPinMainImg = mapPinMain.querySelector(`img`);
const addressInput = adForm.querySelector(`#address`);
let mapPinsList;

const MapPinMainSizes = {
  WIDTH: mapPinMainImg.offsetWidth,
  HEIGHT: mapPinMainImg.offsetHeight,
  POINTER: 22,
  WITH_POINTER_HEIGHT: mapPinMainImg.offsetHeight + 22,
};

const getCoordinateX = function (styleLeft, width) {
  return Math.round(parseInt(styleLeft, 10) + width / 2);
};

const getCoordinateY = function (styleTop, height) {
  return Math.round(parseInt(styleTop, 10) + height);
};

const mapPinMainMousedownHandler = function (evt) {
  if (evt.button === MOUSE_MAIN_BUTTON) {
    activateElements();
  }
};

const mapPinMainKeydownHandler = function (evt) {
  if (evt.key === KEY_OPEN) {
    activateElements();
  }
};

const type = adForm.querySelector(`#type`);
const price = adForm.querySelector(`#price`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);
const timein = adForm.querySelector(`#timein`);
const timeout = adForm.querySelector(`#timeout`);
const timeInput = adForm.querySelector(`.ad-form__element--time`);

const setPriceMinValue = function () {
  if (type.value === `bungalow`) {
    price.setAttribute(`min`, `0`);
    price.setAttribute(`placeholder`, `0`);
  }
  if (type.value === `flat`) {
    price.setAttribute(`min`, `1000`);
    price.setAttribute(`placeholder`, `1000`);
  }
  if (type.value === `house`) {
    price.setAttribute(`min`, `5000`);
    price.setAttribute(`placeholder`, `5000`);
  }
  if (type.value === `palace`) {
    price.setAttribute(`min`, `10000`);
    price.setAttribute(`placeholder`, `10000`);
  }
};

const setCapacityValidity = function () {
  if (roomNumber.value === `1` && capacity.value !== `1`) {
    capacity.setCustomValidity(`Недопустимый вариант`);
  } else if (roomNumber.value === `2` && capacity.value !== `2` && capacity.value !== `1`) {
    capacity.setCustomValidity(`Недопустимый вариант`);
  } else if (roomNumber.value === `3` && capacity.value === `0`) {
    capacity.setCustomValidity(`Недопустимый вариант`);
  } else if (roomNumber.value === `100` && capacity.value !== `0`) {
    capacity.setCustomValidity(`Недопустимый вариант`);
  } else {
    capacity.setCustomValidity(``);
  }
};

for (let i = 0; i < adFormFieldsetList.length; i++) {
  adFormFieldsetList[i].setAttribute(`disabled`, `true`);
}
for (let i = 0; i < mapFiltersList.length; i++) {
  mapFiltersList[i].setAttribute(`disabled`, `true`);
}
mapFeaturesFieldset.setAttribute(`disabled`, `true`);
addressInput.value = `${getCoordinateX(mapPinMain.style.left, MapPinMainSizes.WIDTH)},
 ${getCoordinateY(mapPinMain.style.top, MapPinMainSizes.WITH_POINTER_HEIGHT) - MapPinMainSizes.POINTER - MapPinMainSizes.HEIGHT / 2}`;
mapPinMain.addEventListener(`mousedown`, mapPinMainMousedownHandler);
mapPinMain.addEventListener(`keydown`, mapPinMainKeydownHandler);

let createdPopup;
let popupClose;
let currentTarget;

const openCard = function (evt) {
  currentTarget = evt.currentTarget;
  currentTarget.removeEventListener(`click`, mapPinClickHandler);
  currentTarget.classList.add(`.map__pin--active`);
  const index = Array.from(mapPinsList).indexOf(currentTarget);
  createdPopup = createPopup(ads[index]);
  map.insertBefore(createdPopup, mapFiltersContainer);
  popupClose = createdPopup.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, popupCloseClickHadnler);
  document.addEventListener(`keydown`, popupKeydownHandler);
};

const closeCard = function () {
  currentTarget.classList.remove(`.map__pin--active`);
  currentTarget.addEventListener(`click`, mapPinClickHandler);
  map.removeChild(createdPopup);
  createdPopup = undefined;
  popupClose.removeEventListener(`click`, popupCloseClickHadnler);
  document.removeEventListener(`keydown`, popupKeydownHandler);
};

const mapPinClickHandler = function (evt) {
  if (createdPopup) {
    closeCard();
  }
  openCard(evt);
};

const popupCloseClickHadnler = function () {
  closeCard();
};

const popupKeydownHandler = function (evt) {
  if (evt.key === KEY_CLOSE) {
    closeCard();
  }
};

const activateElements = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adFormFieldsetList.length; i++) {
    adFormFieldsetList[i].removeAttribute(`disabled`);
  }
  for (let i = 0; i < mapFiltersList.length; i++) {
    mapFiltersList[i].removeAttribute(`disabled`);
  }
  mapFeaturesFieldset.removeAttribute(`disabled`);
  mapPins.appendChild(addPins(ads));
  addressInput.value = `${getCoordinateX(mapPinMain.style.left, MapPinMainSizes.WIDTH)},
  ${getCoordinateY(mapPinMain.style.top, MapPinMainSizes.WITH_POINTER_HEIGHT)}`;
  mapPinMain.removeEventListener(`mousedown`, mapPinMainMousedownHandler);
  mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownHandler);
  setPriceMinValue();
  setCapacityValidity();
  type.addEventListener(`input`, function () {
    setPriceMinValue();
  });
  roomNumber.addEventListener(`input`, function () {
    setCapacityValidity();
  });
  capacity.addEventListener(`input`, function () {
    setCapacityValidity();
  });
  timeInput.addEventListener(`input`, function (evt) {
    if (evt.target === timein) {
      timeout.value = evt.target.value;
    } else {
      timein.value = evt.target.value;
    }
  });
  mapPinsList = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let i = 0; i < mapPinsList.length; i++) {
    mapPinsList[i].addEventListener(`click`, mapPinClickHandler);
  }
};
