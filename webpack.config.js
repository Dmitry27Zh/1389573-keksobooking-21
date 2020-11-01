const path = require(`path`);

module.exports = {
  entry: [
    `./js/utils.js`,
    `./js/move.js`,
    `./js/debounce.js`,
    `./js/backend.js`,
    `./js/pin.js`,
    `./js/ads-filtration.js`,
    `./js/map.js`,
    `./js/data.js`,
    `./js/ad-form.js`,
    `./js/map-pin-main.js`,
    `./js/card.js`,
    `./js/photo-preview-upload.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `./bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false,
};
