'use strict';

(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const load = function (onSuccess, onError, index) {
    const xhr = new XMLHttpRequest();
    xhr.open(`get`, URL_LOAD);
    xhr.responseType = `json`;
    xhr.send();
    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });
    xhr.addEventListener(`error`, function () {
      onError(`Ошибка подключения к сети`);
    });
  };

  window.backend = {
    load,
  };
})();
