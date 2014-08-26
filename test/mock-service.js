describe('Mock', function () {

    beforeEach(module('dd.httpMock'));


    var Mock;
    beforeEach(inject(function (_Mock_) {
        Mock = _Mock_;
    }));

    afterEach(function () {
        Mock = null;
    });


    it ('should define default headers', function () {
        expect(Mock.defaults.headers['Content-Type']).to.equal('application/json');
    });

    it ('should define a default statusCode of 200', function () {
        expect(Mock.defaults.statusCode).to.equal(200);
    });

    it ('should define a default responseTime of 750 ms', function () {
        expect(Mock.defaults.responseTime).to.equal(750);
    });

    it ('should define a default transformResponse function', function () {
        expect(Mock.defaults.transformResponse).to.be.a('function');
    });

    it ('should define a default transformRequest function', function () {
        expect(Mock.defaults.transformRequest).to.be.a('function');
    });


    describe('#returnHeadersGetter()', function () {

        it ('should return a function to get headers when given a config object as a parameter', function () {
            var mockConfig = {
                headers: {
                    'Content-type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            };

            var headersGetter = Mock.returnHeadersGetter(mockConfig);

            expect(headersGetter).to.be.a('function');
            expect(headersGetter('Content-type')).to.equal('application/json');
            expect(headersGetter('Cache-Control')).to.equal('no-cache');

        });

    });


});
