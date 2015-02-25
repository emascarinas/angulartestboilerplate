'use strict';
var mockedData = require('../mock/data.e2e.js');

module.exports = function () {
    
    browser.addMockModule('mockedData', mockedData);
    this.gotoMainPage = function () {
        browser.get('/#/');
    };
};

 