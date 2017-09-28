let createClientError = err => {
  const clientError = {
    statusCode: 400,
    body: err
  };
  return clientError;
};

let createSuccessfullResponse = body => {
  const success = {
    statusCode: 200,
    body: JSON.stringify(body)
  };
  return success;
};

let createInteralServerError = err => {
  const interalError = {
    statusCode: 500,
    body: err
  };
  return interalError;
};

exports.createClientError = createClientError;
exports.createSuccessfullResponse = createSuccessfullResponse;
exports.createInteralServerError = createInteralServerError;
