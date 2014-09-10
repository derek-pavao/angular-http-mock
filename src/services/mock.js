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
                        return angular.fromJson(res);
                    },
                    transformRequest: function (req) {
                        return angular.toJson(req);
                    }
                },


                getResponseTime: function (responseTime) {
                    if (responseTime instanceof Array) {
                        var min = responseTime[0];
                        var max = responseTime[1];
                        return Math.floor(Math.random() * (max - min)) + min;
                    } else {
                        return responseTime;
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
