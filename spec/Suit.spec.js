var Suit = require('../Suit.js');

describe('Suit class', function() {
    it('creates clubs', function() {
        var suit = new Suit('C');
        expect(suit).toBeDefined();
        expect(suit).toEqual(jasmine.any(Suit));
        expect(String(suit)).toBe('clubs');
        expect(JSON.stringify(suit)).toBe('"clubs"');
    });

    it('creates diamonds', function() {
        var suit = new Suit('D');
        expect(suit).toBeDefined();
        expect(suit).toEqual(jasmine.any(Suit));
        expect(String(suit)).toBe('diamonds');
        expect(JSON.stringify(suit)).toBe('"diamonds"');
    });

    it('creates hearts', function() {
        var suit = new Suit('H');
        expect(suit).toBeDefined();
        expect(suit).toEqual(jasmine.any(Suit));
        expect(String(suit)).toBe('hearts');
        expect(JSON.stringify(suit)).toBe('"hearts"');
    });

    it('creates spades', function() {
        var suit = new Suit('S');
        expect(suit).toBeDefined();
        expect(suit).toEqual(jasmine.any(Suit));
        expect(String(suit)).toBe('spades');
        expect(JSON.stringify(suit)).toBe('"spades"');
    });

    var invalid = [
        undefined,
        null,
        '',
        'X',
        'c',
        'clubs',
        'Clubs'
    ];
    invalid.forEach(function(arg) {
        it('does not create invalid suit "' + arg + '"', function() {
            expect(function() { new Suit(arg); }).toThrow();
        });
    });
});
