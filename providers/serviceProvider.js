const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

let saveService = (service) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    // write the todo to the database
    return new Promise(function(resolve, reject) {
        dynamoDb.put(service, (error) => {
            // handle potential errors
            if (error) {
                console.log(error);
                reject("An error occured saving the service");
            }
            return resolve(service.Item);    
        });
    });
}

exports.saveService = saveService;