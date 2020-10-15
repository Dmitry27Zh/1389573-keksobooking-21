'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsetList = adForm.querySelectorAll(`fieldset`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const timein = adForm.querySelector(`#timein`);
  const timeout = adForm.querySelector(`#timeout`);
  const timeInput = adForm.querySelector(`.ad-form__element--time`);
  const addressInput = adForm.querySelector(`#address`);

  const fillAddress = function () {
    addressInput.value = `${window.mapPinMain.getCoordX()},
    ${window.mapPinMain.getCoordY()}`;
  };

  const priceList = {
    bungalow: `0`,
    flat: `1000`,
    house: `5000`,
    palace: `10000`,
  };

  const setPriceMinValue = function () {
    price.setAttribute(`min`, priceList[type.value]);
    price.setAttribute(`placeholder`, priceList[type.value]);
  };

  const capacityValidOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  const setCapacityValidity = function () {
    const isValidOption = capacityValidOptions[roomNumber.value].some(function (option) {
      return Number(capacity.value) === option;
    });
    return !isValidOption ? capacity.setCustomValidity(`Недопустимый вариант`) : capacity.setCustomValidity(``);
  };

  const timeInputSync = function (evt) {
    if (evt.target === timein) {
      timeout.value = evt.target.value;
    } else {
      timein.value = evt.target.value;
    }
  };
  const disableForm = function () {
    adFormFieldsetList.forEach(function (fieldset) {
      fieldset.setAttribute(`disabled`, true);
    });
    fillAddress();
  };

  const enableForm = function () {
    adForm.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < adFormFieldsetList.length; i++) {
      adFormFieldsetList[i].removeAttribute(`disabled`);
    }
    fillAddress();
    setPriceMinValue();
    setCapacityValidity();
    type.addEventListener(`input`, setPriceMinValue);
    roomNumber.addEventListener(`input`, setCapacityValidity);
    capacity.addEventListener(`input`, setCapacityValidity);
    timeInput.addEventListener(`input`, timeInputSync);
  };

  window.AdForm = {
    disable: disableForm,
    enable: enableForm,
  };
})();
