angular.module('dd.httpMock')
    .factory('Mock', [
        function () {
            "use strict";


            return {
                defaults: {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    responseTime: 750,
                    response: {},
                    transformResponse: function (res) {
                        return res;
                    },
                    transformRequest: function (req) {
                        return req;
                    }
                },

                returnHeadersGetter: function (mockConfig) {

                    return function (key) {
                        return mockConfig.headers[key];
                    };
                }
            };
        }
    ]);
