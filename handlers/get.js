'use strict';

const serviceValidator = require('../validators/serviceValidator.js');
const serviceAdapter = require('../adapters/serviceAdapter.js');
const responseAdapter = require('../adapters/responseAdapter.js');
const serviceProvider = require('../providers/serviceProvider.js');

module.exports.get = (event, context, callback) => {
    let query = event.queryStringParameters;
    try{
        serviceValidator.validateServiceQuery(query);
    } catch (e) {
        const clientError = responseAdapter.createClientError(err);
        return callback(null, clientError);
    }
    let dbQuery = serviceAdapter.transformClientQueryToDb(query);
    return serviceProvider.getServiceByName(dbQuery).then((service) =>{
        const response = responseAdapter.createSuccessfullResponse(service);
        return callback(null, response);
    }).catch((err) =>{
        const serverError = responseAdapter.createInteralServerError(err)
        return callback(null, serverError);
    });
}