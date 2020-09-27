'use strict';

const ADS_QUANTITY = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const IMG_SOURCES = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNewArray = function (array) {
  const itemsQuantity = getRandomIntInclusive(1, array.length);
  let newArray = [];
  for (let i = 0; i < itemsQuantity; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

const Author = function (x) {
  this.avatar = `img/avatars/user0${x}`;
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
  this.features = getNewArray(FEATURES);
  this.description = `описание`;
  this.photos = getNewArray(IMG_SOURCES);
};

const Coordinates = function () {
  this.x = getRandomIntInclusive(1, 1199);
  this.y = getRandomIntInclusive(131, 629);
};

const Ad = function (x) {
  this.author = new Author(x);
  this.offer = new Offer();
  this.location = new Coordinates();
};

const generateAds = function () {
  let Ads = [];
  for (let i = 1; i <= ADS_QUANTITY; i++) {
    let ad = new Ad(i);
    Ads.push(ad);
  }
  return Ads;
};

document.querySelector(`.map`).classList.remove(`map--faded`);
