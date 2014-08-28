angular.module('dd.httpMock')
    .factory('$httpMock', [
        function () {
            "use strict";

            var Mock = function (config) {
                config.response = JSON.stringify(config.response);
                config.method = config.method.toLowerCase();

                Mock.mockedRequests[config.url] = Mock.mockedRequests[config.url] || {};
                Mock.mockedRequests[config.url][config.method.toLowerCase()] = config;
            };

            Mock.mockedRequests = {};


            Mock.getConfig = function (method, url) {
                try {
                    return Mock.mockedRequests[url][method.toLowerCase()];
                } catch (e) {
                    return undefined;
                }
            };


            return Mock;
        }
    ]);
