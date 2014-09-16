var _ = require('underscore');

function Suit(id) {
    var SHORTHANDS = [ 'C', 'D', 'H', 'S' ];

    var SUITS = _.object(SHORTHANDS, [
        'clubs', 'diamonds', 'hearts', 'spades'
    ]);

    if (id in SUITS)
        this.id = id;
    else
        throw new Error('Invalid suit shorthand');

    this.toString = function() {
        return SUITS[this.id];
    };

    this.toJSON = function() {
        return this.toString();
    };
};

module.exports = Suit;
