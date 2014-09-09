var _ = require('underscore');

var SHORTHANDS = [
    'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'CT', 'CJ', 'CQ',
    'CK', 'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DT', 'DJ',
    'DQ', 'DK', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'HT',
    'HJ', 'HQ', 'HK', 'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9',
    'ST', 'SJ', 'SQ', 'SK'
];
var RANKS = {
    'A': 'ace',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    'T': 'ten',
    'J': 'jack',
    'Q': 'queen',
    'K': 'king'
};
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

exports.SHORTHANDS = SHORTHANDS;
exports.RANKS = RANKS;
exports.SUITS = SUITS;
exports.CARDS = CARDS;
