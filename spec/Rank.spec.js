var Rank = require('../lib/Rank.js');

describe('Rank', function() {
    it('creates an ace', function() {
        var rank = new Rank('A');
        expect(rank).toBeDefined();
        expect(rank).toEqual(jasmine.any(Rank));
        expect(String(rank)).toBe('ace');
        expect(JSON.stringify(rank)).toBe('"ace"');
        expect(Number(rank)).toBe(1);
    });

    it('creates a three', function() {
        var rank = new Rank('3');
        expect(rank).toBeDefined();
        expect(rank).toEqual(jasmine.any(Rank));
        expect(String(rank)).toBe('three');
        expect(JSON.stringify(rank)).toBe('"three"');
        expect(Number(rank)).toBe(3);
    });

    it('creates a ten', function() {
        var rank = new Rank('T');
        expect(rank).toBeDefined();
        expect(rank).toEqual(jasmine.any(Rank));
        expect(String(rank)).toBe('ten');
        expect(JSON.stringify(rank)).toBe('"ten"');
        expect(Number(rank)).toBe(10);
    });

    it('creates a queen', function() {
        var rank = new Rank('Q');
        expect(rank).toBeDefined();
        expect(rank).toEqual(jasmine.any(Rank));
        expect(String(rank)).toBe('queen');
        expect(JSON.stringify(rank)).toBe('"queen"');
        expect(Number(rank)).toBe(12);
    });

    var invalid = [
        undefined,
        null,
        '',
        '1',
        1,
        1.0,
        'X',
        'a',
        'ace',
        'Ace'
    ];
    invalid.forEach(function(arg) {
        it('does not create invalid rank "' + arg + '"', function() {
            expect(function() { new Rank(arg); }).toThrow();
        });
    });
});
