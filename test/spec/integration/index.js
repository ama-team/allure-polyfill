var chai = require('chai'),
    expect = chai.expect,
    index = require('../../../lib'),
    AllurePolyfill = index.AllurePolyfill,
    BlackHoleSink = index.sink.BlackHole;

describe('/index.js', function () {
    var stash,
        blackhole;

    beforeEach(function () {
        blackhole = new BlackHoleSink();
        stash = global.allure;
    });

    afterEach(function () {
        index.restore();
        global.allure = stash;
    });

    it('should install polyfill over empty variable on .install()', function () {
        global.allure = null;
        index.install(blackhole);
        expect(global.allure).to.be.instanceOf(AllurePolyfill);
    });

    it('should install polyfill over non-empty variable on .install()', function () {
        global.allure = {'wharrgarbl': true};
        index.install(blackhole);
        expect(global.allure).to.be.instanceOf(AllurePolyfill);
    });

    it('should return previous value on install', function () {
        var value = global.allure = {'wharrgarbl': true};
        expect(index.install(blackhole)).to.eq(value);
    });

    it('should gracefully restore original value', function () {
        var value = global.allure = {'val': 'val'};

        index.install(blackhole);
        expect(global.allure).to.be.instanceOf(AllurePolyfill);
        expect(index.restore()).to.eq(true);
        expect(global.allure).to.eq(value);
    });

    it('should correctly restore value after several .install() calls', function () {
        var value = {'val': 'val'};
        global.allure = value;

        index.install(blackhole);
        var alpha = global.allure;
        expect(alpha).to.be.instanceOf(AllurePolyfill);

        index.install(blackhole);
        var beta = global.allure;
        expect(beta).to.be.instanceOf(AllurePolyfill);
        expect(beta).not.to.eq(alpha);

        index.install(blackhole);
        var gamma = global.allure;
        expect(gamma).to.be.instanceOf(AllurePolyfill);
        expect(gamma).not.to.eq(alpha);
        expect(gamma).not.to.eq(beta);

        expect(index.restore()).to.eq(true);
        expect(global.allure).to.eq(value);
    });

    it('should install polyfill over empty variable on .ensure()', function () {
        global.allure = null;
        expect(index.ensure(blackhole)).to.eq(true);
        expect(global.allure).to.be.instanceOf(AllurePolyfill);
    });

    it('should not install polyfill over non-empty variable on .ensure()', function () {
        var value = global.allure = {'val': 'val'};
        expect(index.ensure(blackhole)).to.eq(false);
        expect(global.allure).to.eq(value);
    });

    it('should correctly substitute missing sink', function () {
        global.allure = null;
        expect(index.ensure()).to.eq(true);
        global.allure.description('This should end in default sink, please throw exception otherwise');
        index.install();
        global.allure.description('This should end in default sink, please throw exception otherwise');
    });
});