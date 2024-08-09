const getBodyAsync = (body) => {
  return new Promise((resolve, reject) => {
    body.getAsync(Office.CoercionType.Text, function (result) {
      if (result.status === Office.AsyncResultStatus.Succeeded) {
        resolve(result.value);
      } else {
        reject(result.error);
      }
    });
  });
};

const outlookService = {
  getBodyAsync,
};

export default outlookService;