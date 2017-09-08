const validator = require('validator');

let validateService = (service) =>{
    if (typeof service.serviceName !== 'string') {
        msg = 'Missing name of the service';
        console.error(`Validation Failed ${msg}`);
        throw(msg);
      }
    
    if (!validator.isURL(service.url)){
      msg = 'url is invalid';
      console.error(`Validation Failed ${msg}`);
      throw(msg);
    }
}

exports.validateService = validateService;