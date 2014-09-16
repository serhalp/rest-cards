var Rank = require('../Rank.js');
var Suit = require('../Suit.js');
var Card = require('../Card.js');

describe('Card', function() {
    var card;

    beforeEach(function() {
        card = new Card(new Rank('3'), new Suit('D'));
    });

    it('creates a three of diamonds', function() {
        expect(card).toBeDefined();
        expect(card).toEqual(jasmine.any(Card));
    });

    it('has a valid string representation', function() {
        expect(String(card)).toBe('three of diamonds');
    });

    it('has a valid JSON representation', function() {
        expect(JSON.stringify(card)).toBe(JSON.stringify({ 'rank': 'three', 'suit': 'diamonds' }));
    });

    var invalid = [
        [undefined, undefined],
        [null, null],
        ['', ''],
        [undefined, new Suit('D')],
        [new Rank('3'), undefined]
    ];
    invalid.forEach(function(args) {
        it('does not create invalid card "' + args + '"', function() {
            expect(function() { new Card(args[0], args[1]); }).toThrow();
        });
    });
});
