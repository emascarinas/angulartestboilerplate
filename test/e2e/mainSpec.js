'use strict';
var Common = require('../e2e/commonPage.js');
var Login = require('../e2e/loginPage.js');

describe('client homepage', function () {
    var common, loginPage;
    beforeEach(function () {
        common = new Common();
        loginPage = new Login();
    });

    it('should go to login page', function () {
        common.gotoLoginPage();
        var e = element(by.css('#login > ion-content > div > span > h3'));
        expect(e.getText()).toBe('Login to Your Account');
    });
    it('should login and go to account summary page', function () {
        loginPage.mockLoginSuccess();
        common.gotoLoginPage();
        loginPage.fillLoginForm();
        loginPage.clickLogin();
        var e = element(by.css('#account-summary > ion-content > div.scroll > div > span > h3'));
        expect(e.getText()).toBe('Account Summary');
        var e = element(by.css('#account-summary > ion-content > div.scroll > div > div > div > p.amount.ng-binding'));
        expect(e.getText()).toBe('$157.38');
    });
    it('should show invalid username password on login', function () {
        loginPage.mockLoginError();
        common.gotoLoginPage();
        loginPage.fillLoginForm();
        loginPage.clickLogin();
        var e = element(by.css('body > div.popup-container.alert.popup-showing.active > div > div.popup-head > h3'));
        expect(e.getText()).toBe('Invalid Email/Password');
    });

});
