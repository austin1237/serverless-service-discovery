const serviceValidator = require("../validators/serviceValidator.js");
const serviceAdapter = require("../adapters/serviceAdapter.js");
const serviceProvider = require("../providers/serviceProvider.js");

module.exports.post = (event, context, callback) => {
  const timestamp = new Date().getTime();
  let service = {};
  let errResponse = {};

  try {
    service = JSON.parse(event.body);
  } catch (e) {
    errResponse.statusCode = 400;
    errResponse.body = "Invalid json sent up";
    return callback(null, errResponse);
  }

  try {
    serviceValidator.validateService(service);
  } catch (e) {
    errResponse.statusCode = 400;
    errResponse.body = e;
    return callback(null, errResponse);
  }

  service = serviceAdapter.transformClientService(service);
  return serviceProvider
    .saveService(service)
    .then(function(service) {
      response = {
        statusCode: 200,
        body: JSON.stringify(service)
      };
      return callback(null, response);
    })
    .catch(function(e) {
      errResponse.statusCode = 500;
      errResponse.body = e;
      return callback(null, errResponse);
    });
};
