angular.module('httpMock')
    .factory('$httpMock', [
        function () {
            "use strict";

            var mockedRequests = {};

            var Mock = function (config) {
                config.response = JSON.stringify(config.response);

                mockedRequests[config.url] = mockedRequests[config.url] || {};
                mockedRequests[config.url][config.method] = config;
            };


            Mock.getConfig = function (method, url) {
                try {
                    return mockedRequests[url][method];
                } catch (e) {
                    return undefined;
                }
            };


            return Mock;
        }
    ]);
