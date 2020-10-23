'use strict';

(function () {
  const URL = {
    get: `https://21.javascript.pages.academy/keksobooking/data`,
    POST: `https://21.javascript.pages.academy/keksobooking`,
  };

  const createRequest = function (method) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, URL[method]);
    xhr.responseType = `json`;
    return xhr;
  };

  const load = function (onSuccess, onError) {
    const xhr = createRequest(`get`);
    xhr.send();
    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });
    xhr.addEventListener(`error`, function () {
      onError(`Ошибка подключения к сети`);
    });
  };

  const save = function (data, onSuccess, onError) {
    const xhr = createRequest(`POST`);
    xhr.send(data);
    xhr.addEventListener(`load`, function () {
      onSuccess();
    });
    xhr.addEventListener(`error`, function () {
      onError();
    });
  };

  window.backend = {
    load,
    save,
  };
})();
