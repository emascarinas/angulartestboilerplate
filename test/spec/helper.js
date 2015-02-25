var $httpBackend, $rootScope, $controller, baseUrl, beforeEachShared, afterEachShared;


beforeEachShared = function () {
    beforeEach(module('completeBoilerplateApp', 'mockedData'));
    beforeEach(inject(function (_$rootScope_,  _$httpBackend_, _$controller_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        baseUrl = 'https://www.someapi.com/api';
    }));
};
afterEachShared = function () {
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
};



