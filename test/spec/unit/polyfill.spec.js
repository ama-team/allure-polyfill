var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    AllurePolyfill = require('../../../lib/polyfill').AllurePolyfill;

describe('/polyfill.js', function () {
    describe('.AllurePolyfill', function () {
        var sink,
            polyfill;

        beforeEach(function () {
            sink = {accept: sinon.spy(function () {})};
            polyfill = new AllurePolyfill(sink);
        });

        it('should correctly process okey step', function () {
            var result = polyfill.createStep('test step', function () {
                return 12;
            });
            expect(result).to.eq(12);
            expect(sink.accept.callCount).to.eq(2);
        });

        it('should correctly process exceptional step', function () {
            var error = new Error();
            expect(function () {
                return polyfill.createStep('test step', function () {
                    throw error;
                });
            }).to.throw(error);
            expect(sink.accept.callCount).to.eq(2);
        });

        it('should register provided attachment without exception', function () {
            // expecting to return undefined
            expect(polyfill.createAttachment('attachment', 'test content', 'text/plain')).to.be.not.ok;
            expect(sink.accept.callCount).to.eq(1);
        });

        it('should create attachment factory function', function () {
            var factory = polyfill.createAttachment('attachment {0} {1}', function () {
                return 'test content';
            }, 'text/plain');
            expect(sink.accept.callCount).to.eq(0);
            factory('alpha', 'beta');
            expect(sink.accept.callCount).to.eq(1);
            factory('gamma', 'delta');
            expect(sink.accept.callCount).to.eq(2);
        });

        it('should create attachment without type', function () {
            // expecting to return undefined
            expect(polyfill.createAttachment('attachment', 'test content')).to.be.not.ok;
            expect(sink.accept.callCount).to.eq(1);
        });

        it('should set description without exception', function () {
            polyfill.description('test description');
            expect(sink.accept.callCount).to.eq(1);
        });

        it('should set severity without exception', function () {
            polyfill.severity('minor');
            expect(sink.accept.callCount).to.eq(1);
        });

        it('should provide SEVERITY property', function () {
            expect(polyfill.SEVERITY).to.be.ok;
            expect(polyfill.SEVERITY.BLOCKER).to.be.ok;
        });

        it('should set feature without exception', function () {
            polyfill.feature('test feature');
            expect(sink.accept.callCount).to.eq(1);
        });

        it('should set story without exception', function () {
            polyfill.story('test story');
            expect(sink.accept.callCount).to.eq(1);
        });

        it('should add argument without exception', function () {
            polyfill.addArgument('test key', 'test value');
            expect(sink.accept.callCount).to.eq(1);
        });

        it('should add environment option without exception', function () {
            polyfill.addEnvironment('test key', 'test value');
            expect(sink.accept.callCount).to.eq(1);
        });
    });
});
