const urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram',
};

const sendRequest = (onSuccess, onFail, method, body) =>{
  fetch (
    urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const getData = (onSuccess, onFail, method = 'GET') => sendRequest(onSuccess, onFail, method);
const sendData = (onSuccess, onFail, method = 'POST', body) => sendRequest(onSuccess, onFail, method, body);

export {getData, sendData};
