var fs = require('fs');
var _ = require('underscore');

var Rank = require('./Rank.js');
var Suit = require('./Suit.js');

function Card(rank, suit) {
    if (!(rank instanceof Rank && suit instanceof Suit))
        throw new Error('Invalid rank and/or suit');

    this.rank = rank;
    this.suit = suit;

    try {
        this.image = fs.readFileSync(__dirname + '/../assets/img/cards/' + suit.id + rank.id + '.svg');
    } catch (e) {
        throw e;
    }

    this.toString = function() {
        return String(this.rank) + ' of ' + String(this.suit);
    };

    this.toJSON = function() {
        return { 'rank': this.rank, 'suit': this.suit };
    };
};

Card.SHORTHANDS = [
    'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'CT', 'CJ', 'CQ',
    'CK', 'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DT', 'DJ',
    'DQ', 'DK', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'HT',
    'HJ', 'HQ', 'HK', 'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9',
    'ST', 'SJ', 'SQ', 'SK'
];

Card.CARDS = _.object(Card.SHORTHANDS, Card.SHORTHANDS.map(function(id) {
    return new Card(new Rank(id.charAt(1)), new Suit(id.charAt(0)));
}));

module.exports = Card;
