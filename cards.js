var _ = require('underscore');

var SHORTHANDS = [
    'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'CT', 'CJ', 'CQ',
    'CK', 'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DT', 'DJ',
    'DQ', 'DK', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'HT',
    'HJ', 'HQ', 'HK', 'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9',
    'ST', 'SJ', 'SQ', 'SK'
];
var RANK_SHORTHANDS = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
];
var RANKS = _.object(RANK_SHORTHANDS, [
    'ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'
]);
var SUITS = {
    'C': 'clubs',
    'D': 'diamonds',
    'H': 'hearts',
    'S': 'spades'
};
var CARDS = _.object(SHORTHANDS, SHORTHANDS.map(function(id) {
    return {
        'rank': RANKS[id.charAt(1)],
        'suit': SUITS[id.charAt(0)]
    };
}));
var CARD_RANK_ORDINALS = _.object(SHORTHANDS, SHORTHANDS.map(function(id) {
    return 1 + RANK_SHORTHANDS.indexOf(id.charAt(1));
}));

exports.SHORTHANDS = SHORTHANDS;
exports.RANK_SHORTHANDS = RANK_SHORTHANDS;
exports.RANKS = RANKS;
exports.SUITS = SUITS;
exports.CARDS = CARDS;
exports.CARD_RANK_ORDINALS = CARD_RANK_ORDINALS;
