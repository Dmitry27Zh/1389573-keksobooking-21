'use strict';

(function () {
  const mapPinMain = window.pin.mapPins.querySelector(`.map__pin--main`);
  const mapPinMainImg = mapPinMain.querySelector(`img`);

  const MapPinMainSizes = {
    Width: mapPinMainImg.offsetWidth,
    Height: mapPinMainImg.offsetHeight + 22,
    changeDeactivatedHeight() {
      this.Height = mapPinMainImg.offsetHeight + 22;
    },
    changeActivatedHeight() {
      this.Height = mapPinMainImg.offsetHeight / 2;
    }
  };

  const getCoordX = function () {
    return Math.round(mapPinMain.offsetLeft + MapPinMainSizes.Width / 2);
  };
  const getCoordY = function () {
    return Math.round(mapPinMain.offsetTop + MapPinMainSizes.Height);
  };

  const moveMapPinMain = function (evt, moveSomething) {
    moveSomething(evt, function (move) {
      const getPinX = function (initialX, moveValueX) {
        let x = initialX - moveValueX;
        if (x < 0) {
          x = 0;
        } else if (x > window.pin.mapPins.offsetWidth - MapPinMainSizes.Width) {
          x = window.pin.mapPins.offsetWidth - MapPinMainSizes.Width;
        }
        return x;
      };
      const getPinY = function (initialY, moveValueY) {
        let y = initialY - moveValueY;
        if (y < 131 - MapPinMainSizes.Height) {
          y = 131 - MapPinMainSizes.Height;
        } else if (y > 629 - MapPinMainSizes.Height) {
          y = 629 - MapPinMainSizes.Height;
        }
        return y;
      };
      mapPinMain.style.left = `${getPinX(mapPinMain.offsetLeft, move.x)}px`;
      mapPinMain.style.top = `${getPinY(mapPinMain.offsetTop, move.y)}px`;
      window.adForm.fillAddress();
    });
  };


  const mapPinMainMousedownHandler = function (evt) {
    window.utils.isMousedownEvent(evt, function () {
      if (window.map.element.classList.contains(`map--faded`)) {
        window.main.activateElements();
        mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownHandler);
      }
      moveMapPinMain(evt, window.move.add);
    });
  };

  const mapPinMainKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      window.main.activateElements();
      mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownHandler);
    });
  };

  const activateMapPinMain = function () {
    mapPinMain.addEventListener(`mousedown`, mapPinMainMousedownHandler);
    mapPinMain.addEventListener(`keydown`, mapPinMainKeydownHandler);
    MapPinMainSizes.changeActivatedHeight();
  };

  window.mapPinMain = {
    activate: activateMapPinMain,
    getCoordX,
    getCoordY,
  };
})();
