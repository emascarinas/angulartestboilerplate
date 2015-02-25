var mockedData = function () {
    angular.module('mockedData', [])
            .value('accounts', [{"Name":"test","amount":5.3}, {"Name":"test2","amount":7.8}])
            .value('KeyID', {"KeyId":"12121212"});
};
module.exports = mockedData;