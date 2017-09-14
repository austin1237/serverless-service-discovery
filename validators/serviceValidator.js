const validator = require('validator');

let validateService = (service) =>{
  if (typeof service.serviceName !== 'string') {
    const msg = 'missing name of the service';
    console.error(`Validation Failed ${msg}`);
    throw(new Error(msg));
  }
  
  if (!validator.isURL(service.url)){
    const msg = 'service url is invalid';
    console.error(`Validation Failed ${msg}`);
    throw(new Error(msg));
  }
}

let validateServiceQuery = (query) =>{
  if (!query || !query.serviceName){
    const msg = 'serviceName must be included as a query parameter';
    console.error(`Validation Failed ${msg}`);
    throw(msg);
  }

  if (typeof query.serviceName !== 'string'){
    const msg = 'serviceName must be a string';
    console.error(`Validation Failed ${msg}`);
    throw(msg);
  }

}

exports.validateService = validateService;
exports.validateServiceQuery = validateServiceQuery;