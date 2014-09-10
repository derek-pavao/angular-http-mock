angular.module('dd.httpMock', [])
    .config([
        '$provide',
        function ($provide) {
            "use strict";

            $provide.decorator('$http', [
                '$delegate',
                '$httpMock',
                '$q',
                '$timeout',
                'Mock',
                function ($delegate, $httpMock, $q, $timeout, Mock) {

                    // var oldGet = $delegate.get;
                    var oldDelegate = $delegate;
                    // var oldPost = $delegate.post;
                    // var oldPut = $delegate.put;
                    // var oldDelete = $delegate.delete;



                    $delegate = function (httpConfig) {

                        var mockConfig = $httpMock.getConfig(httpConfig.method, httpConfig.url);

                        if (typeof mockConfig !== 'undefined') {
                            var defer = $q.defer();

                            mockConfig = angular.extend({}, Mock.defaults, mockConfig);

                            var successCb = function () {};
                            var failureCb = function () {};

                            $timeout(function () {
                                console.warn('Returning a Mocked Request', mockConfig);
                                var resolveObj = {
                                    data: httpConfig.transformResponse(mockConfig.response, Mock.returnHeadersGetter(mockConfig)),
                                    status: mockConfig.statusCode,
                                    headers: Mock.returnHeadersGetter(mockConfig),
                                    config: httpConfig,
                                    statusText: mockConfig.statusCode.toString()
                                };


                                if (mockConfig.statusCode.toString().charAt(0) === '4' && mockConfig.statusCode.toString().charAt(0) === '5') {
                                    defer.reject(resolveObj);
                                    failureCb(resolveObj);
                                } else {
                                    defer.resolve(resolveObj);
                                    successCb(resolveObj);
                                }

                            }, Mock.getResponseTime(mockConfig.responseTime));


                            defer.promise.success = function (cb) {
                                successCb = cb;
                            };

                            defer.promise.failure = function (cb) {
                                failureCb = cb;
                            };

                            return defer.promise;
                        } else {
                            return oldDelegate.apply(this, arguments);
                        }

                    };



                    $delegate.get = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'GET';

                        return $delegate(config);
                    };

                    $delegate.delete = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'DELETE';

                        return $delegate(config);
                    };

                    $delegate.head = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'HEAD';

                        return $delegate(config);
                    };

                    $delegate.jsonp = function (url, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'JSONP';

                        return $delegate(config);
                    };

                    $delegate.post = function (url, data, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'POST';
                        config.data = data;

                        return $delegate(config);
                    };

                    $delegate.put = function (url, data, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'PUT';
                        config.data = data;

                        return $delegate(config);
                    };

                    $delegate.patch = function (url, data, config) {
                        config = config || {};
                        config.url = url;
                        config.method = 'PATCH';
                        config.data = data;

                        return $delegate(config);
                    };

                    return $delegate;
                }
            ]);
        }
    ]);
