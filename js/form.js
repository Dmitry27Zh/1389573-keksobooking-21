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
    addressInput.value = `${window.mapPinMain.x()},
    ${window.mapPinMain.y()}`;
  };

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

  const timeInputSync = function (evt) {
    if (evt.target === timein) {
      timeout.value = evt.target.value;
    } else {
      timein.value = evt.target.value;
    }
  };

  const disableForm = function () {
    for (let i = 0; i < adFormFieldsetList.length; i++) {
      adFormFieldsetList[i].setAttribute(`disabled`, `true`);
    }
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

  window.form = {
    disableForm,
    enableForm,
  };
})();
