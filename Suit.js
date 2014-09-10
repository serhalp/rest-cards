var _ = require('underscore');

function Suit(id) {
    if (id in Suit.SUITS)
        this.id = id;
    else
        return;
};

Suit.SUIT_SHORTHANDS = [ 'C', 'D', 'H', 'S' ];

Suit.SUITS = _.object(Suit.SUIT_SHORTHANDS, [
    'clubs', 'diamonds', 'hearts', 'spades'
]);

Suit.prototype.toString = function() {
    return Suit.SUITS[this.id];
};

Suit.prototype.toJSON = function() {
    return this.toString();
};

module.exports = Suit;
