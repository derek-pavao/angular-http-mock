describe('RegisterService', function () {

    beforeEach(module('dd.httpMock'));

    var $httpMock,
        testConfig;


    beforeEach(inject(function (_$httpMock_) {
        $httpMock = _$httpMock_;

        testConfig = {
            url: '/some-fake-url',
            method:'GET',
            response: {
                "foo":"bar"
            }
        };

        $httpMock(testConfig);
    }));

    afterEach(function () {
        $httpMock = null;
    });


    it ('$httpMock should be able to register its configs to be called later', function () {
        expect($httpMock.mockedRequests['/some-fake-url']['get']).to.equal(testConfig);
    });


    it ('getConfig should return the config object for a url and method', function () {
        var config = $httpMock.getConfig('GET', '/some-fake-url');
        expect(config).to.equal(testConfig);
    });


    it ('should store the response as a json string', function () {
        var config = $httpMock.getConfig('GET', '/some-fake-url');
        expect(config.response).to.be.a('string');
    });

    it ('should always store method names as case insensitive', function () {
        var config = $httpMock.getConfig('get', '/some-fake-url');
        expect(config.method).to.equal('get');
    });




});
