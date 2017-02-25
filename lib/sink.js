/**
 * @class
 *
 * @implements Sink
 */
function Console() {
    this.accept = console.log.bind(console);
}

/**
 * @class
 *
 * @implements Sink
 */
function BlackHole() {
    this.accept = function () {};
}

exports = module.exports = {
    Console: Console,
    BlackHole: BlackHole
};
