angular.module('dd.httpMock', [

])
    .config([
        '$provide',
        function ($provide) {
            "use strict";

            $provide.decorator('$http', [
                '$delegate',
                '$httpMock',
                '$q',
                '$timeout',
                function ($delegate, $httpMock, $q, $timeout) {

                    var oldGet = $delegate.get;
                    var oldDelegate = $delegate;
                    var oldPost = $delegate.post;
                    var oldPut = $delegate.put;
                    var oldDelete = $delegate.delete;



                    $delegate = function (httpConfig) {
                        // if (config.url.indexOf('kraken-service') !== -1) {
                        //     console.log(config.method, config.url);
                        // }

                        var mockConfig = $httpMock.getConfig(httpConfig.method, httpConfig.url);
                        if (typeof mockConfig !== 'undefined') {
                            var defer = $q.defer();

                            $timeout(function () {
                                console.warn('Returning a Mocked Request', mockConfig);
                                debugger;
                                defer.resolve({data: httpConfig.transformResponse(mockConfig.response)});
                            }, mockConfig.responseTime);

                            return defer.promise;
                        } else {
                            return oldDelegate.apply(this, arguments);
                        }

                    };


                    $delegate.get = function (url) {
                        if (url.indexOf('html') === -1) {
                            // console.log('url', url);
                        }
                        return oldGet.apply(this, arguments);
                    };

                    $delegate.post = oldPost;
                    $delegate.put = oldPut;
                    $delegate.delete = oldDelete;

                    return $delegate;
                }
            ]);
        }
    ]);
