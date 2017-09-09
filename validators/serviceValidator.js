const validator = require('validator');

let validateService = (service) =>{
  if (typeof service.serviceName !== 'string') {
    const msg = 'Missing name of the service';
    console.error(`Validation Failed ${msg}`);
    throw(msg);
  }
  
  if (!validator.isURL(service.url)){
    const msg = 'url is invalid';
    console.error(`Validation Failed ${msg}`);
    throw(msg);
  }
}

let validateServiceQuery = (query) =>{
  if (!query || !query.serviceName){
    const msg = 'serviceName must be included as a query parameter';
    console.error(`Validation Failed ${msg}`);
    throw(msg);
  }

  if (typeof query.serviceName !== 'string'){
    const msg = 'serviceName must be included as a query parameter';
    console.error(`Validation Failed ${msg}`);
    throw(msg);
  }

}

exports.validateService = validateService;
exports.validateServiceQuery = validateServiceQuery;