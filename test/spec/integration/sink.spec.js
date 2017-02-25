var Sink = require('../../../lib/sink');

describe('/sink.js', function () {
    describe('.BlackHole', function () {
        it('should accept provided value without exception', function () {
            new Sink.BlackHole().accept('test payload');
        });
    });
    describe('.Console', function () {
        it('should accept provided value without exception', function () {
            new Sink.Console().accept('test payload');
        });
    });
});