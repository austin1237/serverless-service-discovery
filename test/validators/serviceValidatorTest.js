const expect = require('chai').expect;
const serviceValidator = require('../../validators/serviceValidator.js');
describe('serviceValidator', function(){
    
    describe('validateService', function(){
        it('should throw an error if serviceName is missing', function(){
            mockService = {
                url: "www.test.com"
            }
            errMsg = 'missing name of the service';
            expect(() => serviceValidator.validateService(mockService)).to.throw(errMsg);
        });

        it('should throw an error if url is invalid', function(){
            mockService = {
                serviceName: "testName",
                url: "www.|test.com"
            }
            errMsg = 'service url is invalid';
            expect(() => serviceValidator.validateService(mockService)).to.throw(errMsg);
        });

        it('should not throw an error if service is valid', function(){
            mockService = {
                serviceName: "testName",
                url: "www.test.com"
            }
            serviceValidator.validateService(mockService);
        });
    });


    describe('validateServiceQuery', function(){
        it('should throw an error if query is empty', function(){
            mockQuery = {}
            errMsg = 'serviceName must be included as a query parameter';
            expect(() => serviceValidator.validateServiceQuery(mockQuery)).to.throw(errMsg);
        });

        it('should throw an error if query is an empty string', function(){
            mockQuery = {
                serviceName: ''
            }
            errMsg = 'serviceName must be included as a query parameter';
            expect(() => serviceValidator.validateServiceQuery(mockQuery)).to.throw(errMsg);
        });


        it('should not throw an error if query is valid', function(){
            mockQuery = {
                serviceName: "testName",
            }
            serviceValidator.validateServiceQuery(mockQuery);
        });
    });
    
});