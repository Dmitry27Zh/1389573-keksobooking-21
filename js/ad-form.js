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
  const adFormReset = adForm.querySelector(`.ad-form__reset`);

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

  const showSaveMessage = function (status) {
    const template = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
    const element = template.cloneNode(`true`);
    document.body.insertAdjacentElement(`afterbegin`, element);
    document.addEventListener(`click`, onClickMessage);
    document.addEventListener(`keydown`, onKeydownMessage);
  };

  const closeMessage = function () {
    document.body.removeChild(document.body.children[0]);
    document.removeEventListener(`click`, onClickMessage);
    document.removeEventListener(`keydown`, onKeydownMessage);
  };

  const onClickMessage = function () {
    closeMessage();
  };

  const onKeydownMessage = function (evt) {
    window.utils.isEscEvent(evt, closeMessage);
  };

  const showSaveErrorMessage = function () {
    showSaveMessage(`error`);
  };

  const onSuccessSubmit = function () {
    showSaveMessage(`success`);
    window.main.deactivateElements();
  };

  const adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessSubmit, showSaveErrorMessage);
  };

  const adFormResetClickHandler = function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.main.deactivateElements();
  };

  const disableForm = function () {
    adFormFieldsetList.forEach(function (fieldset) {
      fieldset.setAttribute(`disabled`, true);
    });
    fillAddress();
    type.removeEventListener(`input`, setPriceMinValue);
    roomNumber.removeEventListener(`input`, setCapacityValidity);
    capacity.removeEventListener(`input`, setCapacityValidity);
    timeInput.removeEventListener(`input`, timeInputSync);
    adForm.removeEventListener(`submit`, adFormSubmitHandler);
    adFormReset.removeEventListener(`click`, adFormResetClickHandler);
    window.photoPreviewUpload.disable();
  };

  const enableForm = function () {
    adForm.classList.remove(`ad-form--disabled`);
    adFormFieldsetList.forEach(function (fieldset) {
      fieldset.removeAttribute(`disabled`);
    });
    fillAddress();
    setPriceMinValue();
    setCapacityValidity();
    type.addEventListener(`input`, setPriceMinValue);
    roomNumber.addEventListener(`input`, setCapacityValidity);
    capacity.addEventListener(`input`, setCapacityValidity);
    timeInput.addEventListener(`input`, timeInputSync);
    adForm.addEventListener(`submit`, adFormSubmitHandler);
    adFormReset.addEventListener(`click`, adFormResetClickHandler);
    window.photoPreviewUpload.enable();
  };

  window.adForm = {
    element: adForm,
    disable: disableForm,
    enable: enableForm,
    fillAddress,
  };
})();
