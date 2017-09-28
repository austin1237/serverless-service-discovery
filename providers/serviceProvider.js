const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

let saveService = service => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return new Promise(function(resolve, reject) {
    dynamoDb.put(service, error => {
      if (error) {
        console.log(error);
        return reject("An error occured saving the service");
      }
      return resolve(service.Item);
    });
  });
};

let getServiceByName = dbQuery => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  console.log(dbQuery);
  return new Promise(function(resolve, reject) {
    dynamoDb.get(dbQuery, (error, result) => {
      if (error) {
        console.error(error);
        return reject("Couldn't fetch the service");
      }
      console.log("item in db is", result);
      return resolve(result.Item);
    });
  });
};

exports.getServiceByName = getServiceByName;
exports.saveService = saveService;
