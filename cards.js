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

function Card(rank, suit) {
    this.rank = new Rank(rank);
    this.suit = new Suit(suit);

    if (!this.rank || !this.suit)
        return;
};

Card.SHORTHANDS = [
    'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'CT', 'CJ', 'CQ',
    'CK', 'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DT', 'DJ',
    'DQ', 'DK', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'HT',
    'HJ', 'HQ', 'HK', 'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9',
    'ST', 'SJ', 'SQ', 'SK'
];

Card.CARDS = _.object(Card.SHORTHANDS, Card.SHORTHANDS.map(function(id) {
    return new Card(id.charAt(1), id.charAt(0));
}));

exports.Rank = Rank;
exports.Suit = Suit;
exports.Card = Card;
