# angular-http-mock

## Currently Underdevelopment, Not For Production

When working in a team environment and the UI team is ahead of
the backend team during development it poses the question. How
do I mock http requests until the backend is done implementing
the feature. Enter angular-http-mock


```javascript
    angular.module('moduleName')
        .run([
            '$httpMock',
            function ($httpMock) {
                "use strict";
                
                $httpMock({
                    url: '/api/v1/some-resource',
                    responseTime: 750,
                    method: 'GET',
                    response: {
                        "meta": {
                            "requestPath":"/api/v1/some-resource",
                            "requestMethod":"GET"
                        },
                        "result":[-422,-12,10349,12304,12934,13686,14119,15267,15307,25453,36404,36587,71471,77879],
                        "error":null
                    }
                });
            }
        ]);

```
