var _ = require('underscore');

function Rank(id) {
    if (id in Rank.RANKS)
        this.id = id;
    else
        return;
};

Rank.RANK_SHORTHANDS = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
];

Rank.RANKS = _.object(Rank.RANK_SHORTHANDS, [
    'ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'
]);

Rank.RANK_ORDINALS = _.object(Rank.RANK_SHORTHANDS, Rank.RANK_SHORTHANDS.map(function(id, i) {
    return i + 1;
}));

Rank.prototype.toString = function() {
    return Rank.RANKS[this.id];
};

Rank.prototype.valueOf = function() {
    return Rank.RANK_ORDINALS[this.id];
};

Rank.prototype.toJSON = function() {
    return this.toString();
};

module.exports = Rank;
