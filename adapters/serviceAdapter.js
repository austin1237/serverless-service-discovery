let transformClientService = (clientService) =>{
    now = new Date();
    dbService = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            serviceName: clientService.serviceName,
            url: clientService.url,
            createdAt: now,
            updatedAt: now
        },
    };
    return dbService;
}

let transformClientQueryToDb = (query) =>{
    const dbQuery = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            serviceName: query.serviceName,
        },
    };
    return dbQuery
}

exports.transformClientQueryToDb = transformClientQueryToDb;
exports.transformClientService = transformClientService;