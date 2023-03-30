const sendRequest = (url, onSuccess, onError, options) => {
  if (!options) {
    options = {
      method: 'GET',
      credentials: 'same-origin'
    };
  }
  fetch(
    url,
    options
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    onSuccess(data);
  }).catch((err) => {
    onError(err);
  });
};

export {sendRequest};
