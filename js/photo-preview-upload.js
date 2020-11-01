'use strict';

(function () {
  const FILE_TYPES = [`jpeg`, `gif`, `png`, `jpeg`];
  const avatarChooser = window.adForm.element.querySelector(`.ad-form-header__input`);
  const avatarPreview = window.adForm.element.querySelector(`.ad-form-header__preview img`);
  const avatarPreviewInitialSrc = avatarPreview.src;
  const adPhotoChooser = window.adForm.element.querySelector(`.ad-form__input`);
  const adPhotoPreview = window.adForm.element.querySelector(`.ad-form__photo`);

  const createImg = function () {
    const image = document.createElement(`img`);
    image.width = `70`;
    image.height = `70`;
    image.alt = `Фотография жилья`;
    return image;
  };

  const removeImg = function () {
    const createdImg = adPhotoPreview.querySelector(`img`);
    if (createdImg) {
      adPhotoPreview.removeChild(createdImg);
    }
  };

  const changePreview = function (input, previewElement) {
    const file = input.files[0];
    const fileType = file.type;
    const preview = previewElement.matches(`img`) ? previewElement : previewElement.appendChild(createImg());
    const matches = FILE_TYPES.some(function (type) {
      return fileType.endsWith(type);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

  };

  const avatarChangeHandler = function () {
    changePreview(avatarChooser, avatarPreview);
  };

  const adPhotoChangeHandler = function () {
    changePreview(adPhotoChooser, adPhotoPreview);
  };

  const enablePhotoUpload = function () {
    avatarChooser.addEventListener(`change`, avatarChangeHandler);
    adPhotoChooser.addEventListener(`change`, adPhotoChangeHandler);
  };

  const disablePhotoUpload = function () {
    avatarChooser.removeEventListener(`change`, avatarChangeHandler);
    adPhotoChooser.removeEventListener(`change`, adPhotoChangeHandler);
    avatarPreview.src = avatarPreviewInitialSrc;
    removeImg();
  };

  window.photoPreviewUpload = {
    enable: enablePhotoUpload,
    disable: disablePhotoUpload,
  };
})();
