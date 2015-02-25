'use strict';
var Login = function () {
    this.fillLoginForm = function () {
        element(by.model('email')).clear().sendKeys('e@y.com');
        element(by.model('password')).clear().sendKeys('mytestpassword');
    };
    this.clickLogin = function () {
        var e = element(by.css('body > div > div.ng-scope > div > form > button'))
        e.click();
    };
    this.mockLoginSuccess = function () {
        var httpBackendMock = function () {
            angular.module('httpBackendMock', ['ngMockE2E'])
                    .run(function ($httpBackend, KeyID) {
                        $httpBackend.whenPOST('https://www.someapi.com/api').respond(KeyID);
                        $httpBackend.whenGET(/.*/).passThrough();
                    });
        };
        browser.addMockModule('httpBackendMock', httpBackendMock);
    }
    this.mockLoginError = function () {
        var httpBackendMock = function () {
            angular.module('httpBackendMock', ['ngMockE2E'])
                    .run(function ($httpBackend) {
                        $httpBackend.whenPOST('https://www.someapi.com/api').respond(401, {"mess":"Invalid username/password"});
                        $httpBackend.whenGET(/.*/).passThrough();
                    });
        };
        browser.addMockModule('httpBackendMock', httpBackendMock);
    }    
};

module.exports = Login;
