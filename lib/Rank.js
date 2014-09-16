var _ = require('underscore');

function Rank(id) {
    var SHORTHANDS = [
        'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
    ];

    var RANKS = _.object(SHORTHANDS, [
        'ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'
    ]);

    var RANK_ORDINALS = _.object(SHORTHANDS, SHORTHANDS.map(function(id, i) {
        return i + 1;
    }));

    if (id in RANKS)
        this.id = id;
    else
        throw new Error('Invalid rank shorthand');

    this.toString = function() {
        return RANKS[this.id];
    };

    this.valueOf = function() {
        return RANK_ORDINALS[this.id];
    };

    this.toJSON = function() {
        return this.toString();
    };
};

module.exports = Rank;
