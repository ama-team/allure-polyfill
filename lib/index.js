var AllurePolyfill = require('./polyfill').AllurePolyfill,
    sinks = require('./sink'),
    defaultSink = new sinks.BlackHole();

var stash;

/**
 * Tells if polyfill is currently installed.
 *
 * @return {boolean}
 */
function installed() {
    return !!stash;
}

/**
 * Installs polyfill disregarding current state.
 *
 * @param {Sink} sink Debug sink notes will be dumped to.
 *
 * @return {AllurePolyfill|Allure|undefined} Whatever has been in `global.allure` before `.install()` call
 */
function install(sink) {
    if (!installed()) {
        // wrapping value so if allure is undefined stash will become truthy from now on
        stash = {
            allure: global.allure
        };
    }
    var current = global.allure;
    global.allure = new AllurePolyfill(sink || defaultSink);
    return current;
}

/**
 * Restores pre-installation Allure state.
 *
 * @return {boolean} True if restoration took place, false otherwise.
 */
function restore() {
    if (installed()) {
        global.allure = stash.allure;
        stash = null;
        return true;
    }
    return false;
}

/**
 * Installs polyfill only if `global.allure` is not occupied.
 *
 * @param {Sink} sink Debug sink all messages would be dumped to.
 * @return {boolean} Whether installation has been really made.
 */
function ensure(sink) {
    if (!global.allure) {
        install(sink || defaultSink);
        return true;
    }
    return false;
}

exports = module.exports = {
    AllurePolyfill: AllurePolyfill,
    sink: sinks,
    install: install,
    installed: installed,
    restore: restore,
    ensure: ensure
};
