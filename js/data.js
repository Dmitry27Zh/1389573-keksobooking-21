'use strict';

(function () {
  const ADS_QUANTITY = 8;
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const IMG_SOURCES = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const mapPinsWidth = window.pin.mapPins.offsetWidth;

  const Author = function (x) {
    this.avatar = `img/avatars/user0${x}.png`;
  };

  const Offer = function () {
    this.title = `заголовок`;
    this.address = `600, 350`;
    this.price = 100;
    this.type = TYPES[window.utils.getRandomIntInclusive(0, TYPES.length - 1)];
    this.rooms = 1;
    this.guests = 1;
    this.checkin = TIMES[window.utils.getRandomIntInclusive(0, TIMES.length - 1)];
    this.checkout = TIMES[window.utils.getRandomIntInclusive(0, TIMES.length - 1)];
    this.features = window.utils.shuffleArray(FEATURES);
    this.description = `описание`;
    this.photos = window.utils.shuffleArray(IMG_SOURCES);
  };

  const Coordinates = function () {
    this.x = window.utils.getRandomIntInclusive(1, mapPinsWidth - 1);
    this.y = window.utils.getRandomIntInclusive(131, 629);
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

  const ads = generateAds();

  window.data = {
    ads,
  };
})();
