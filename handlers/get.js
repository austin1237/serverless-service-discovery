'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
    const errResponse = {
        statusCode: 400
    }
    if (!event.queryStringParameters){
        console.error('Validation Failed');
        errResponse.body = JSON.stringify({ "message": 'serviceName must be included as a query param'});    
        callback(null, errResponse);
        return;
    }
    const serviceName = event.queryStringParameters.serviceName;

    if (typeof serviceName === null  || typeof serviceName === undefined){
        console.error('Validation Failed');
        errResponse.body = JSON.stringify({ "message": 'serviceName must be included as a query param'});    
        callback(null, errResponse);
        return;
    }

    if (serviceName && typeof serviceName !== 'string'){
        console.error('Validation Failed');
        errResponse.body = JSON.stringify({ "message": 'serviceName must be a string'});    
        callback(null, errResponse);
        return;
    }

    const dbParams = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            serviceName: serviceName,
        },
    };

    dynamoDb.get(dbParams, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t fetch the todo item.'));
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
        callback(null, response);
  });
}