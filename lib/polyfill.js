var indent = require('indent-string');

var Severity = {
    BLOCKER: 'blocker',
    CRITICAL: 'critical',
    NORMAL: 'normal',
    MINOR: 'minor',
    TRIVIAL: 'trivial'
};

    /**
 * @class
 * @param {Sink} sink
 */
function AllurePolyfill(sink) {

    this.addArgument = function (name, value) {
        sink.accept('Argument registered: `' + name + '` = `' + value + '`')
    };

    this.addEnvironment = function (name, value) {
        sink.accept('Environment option registered: `' + name + '` = `' + value + '`');
    };

    this.createAttachment = function (name, content, type) {
        var self = this;
        if (typeof content === 'function') {
            return function () {
                var formattedName = name,
                    data;
                for (var i = 0; i < arguments.length; i++) {
                    formattedName = formattedName.replace('{' + i + '}', arguments[i]);
                }
                data = content.call(this, arguments);
                self.createAttachment(name, data, type);
            }
        }
        sink.accept('Attachment `' + name + '`, type `' + type + '`:\n' + indent(content));
    };

    this.createStep = function (name, step) {
        // todo: promise support
        sink.accept('Step `' + name + '` started');
        try {
            var value = step();
            sink.accept('Step `' + name + '` has completed');
            return value;
        } catch (e) {
            sink.accept('Step `' + name + '` has failed');
            throw e;
        }
    };

    this.description = function (description) {
        sink.accept('Test description set:\n' + indent(description, 2));
    };

    this.feature = function (feature) {
        sink.accept('Test feature set: ' + feature);
    };

    this.severity = function (severity) {
        sink.accept('Test severity set: ' + severity);
    };

    this.story = function (story) {
        sink.accept('Test story set: ' + story);
    };

    this.SEVERITY = Severity;
}

exports = module.exports = {
    AllurePolyfill: AllurePolyfill,
    Severity: Severity
};
