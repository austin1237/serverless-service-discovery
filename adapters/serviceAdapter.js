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

exports.transformClientService = transformClientService;