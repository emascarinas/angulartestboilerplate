'use strict';

describe('Service: LoginService', function () {

    var LoginService;
    beforeEachShared();
    beforeEach(inject(function (_LoginService_) {
        LoginService = _LoginService_;
    }));
    afterEachShared();

    it('should do something', function () {
        expect(!!LoginService).toBe(true);
    });
    it('should login successfully', inject(function (KeyID) {
        $httpBackend.whenPOST(baseUrl).respond(KeyID);
        var result = LoginService.authenticate({'username': 'dummy', 'password': 'dummy'});
        $httpBackend.flush();
        expect(result.KeyId).toBe('12121212');
    }));

});
