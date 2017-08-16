'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const validator = require('validator');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.post = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const errResponse = {
    statusCode: 400
  }
  let data = {};

  try {
    data = JSON.parse(event.body);
  } catch(e){
    console.error(e);
    errResponse.body = JSON.stringify({ "message": 'Invalid json sent up'});
    callback(null, errResponse);
    return;
  }

  if (typeof data.serviceName !== 'string') {
    console.error('Validation Failed');
    errResponse.body = JSON.stringify({ "message": 'Missing name of the service'});
    
    callback(null, errResponse);
    return;
  }

  if (typeof data.url === undefined || typeof data.url === null) {
    console.error('Validation Failed');
    errResponse.body = JSON.stringify({ "message":'Missing url of the service'});
    callback(null, errResponse);
    return;
  }

  if (!validator.isURL(data.url)){
    console.error('Validation Failed');
    errResponse.body = JSON.stringify({ "message": 'invalid url'});
    callback(null, errResponse);
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      serviceName: data.serviceName,
      url: data.url,
      createdAt: timestamp,
      updatedAt: timestamp
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldnt create the clip'));
      return;
    }

    // create a response
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};