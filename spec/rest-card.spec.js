var restify = require('restify');

var jsonClient = restify.createJsonClient({
    'url': 'http://localhost:' + (process.env.PORT || 8080)
}), stringClient = restify.createStringClient({
    'url': 'http://localhost:' + (process.env.PORT || 8080)
});

describe('rest-cards /cards', function() {
    it('gets the full collection of valid cards', function(done) {
        jsonClient.get('/cards', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toEqual('application/json');
            expect(obj).toEqual(jasmine.any(Array));
            expect(obj.length).toEqual(52);
            obj.forEach(function(card) {
                expect(card).toEqual(jasmine.any(String));
                expect(card.length).toEqual(8); // e.g. '/card/D3'
            });
            done();
        });
    });
});

describe('rest-cards /card/', function() {
    it('gets a card by shorthand', function(done) {
        jsonClient.get('/card/D3', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toEqual('application/json');
            expect(obj.rank).toBeDefined();
            expect(obj.rank).toEqual('three');
            expect(obj.suit).toBeDefined();
            expect(obj.suit).toEqual('diamonds');
            done();
        });
    });

    it('gets a card image by shorthand', function(done) {
        stringClient.get({ 'path': '/card/D3', 'headers': { 'accept': 'image/*' } },
                         function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toEqual('image/svg+xml');
            expect(obj).toEqual(jasmine.any(String));
            expect(obj).toMatch(/<?xml/);
            expect(obj).toMatch(/<svg/);
            done();
        });
    });

    it('gets a card\'s suit', function(done) {
        jsonClient.get('/card/D3/suit', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toEqual('application/json');
            expect(obj).toBe('diamonds');
            done();
        });
    });

    it('gets a card\'s rank', function(done) {
        jsonClient.get('/card/D3/rank', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toEqual('application/json');
            expect(obj).toBe('three');
            done();
        });
    });

    it('gets a card\'s ordinal rank', function(done) {
        jsonClient.get('/card/D3/rank/ordinal', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toEqual('application/json');
            expect(obj).toEqual(3);
            done();
        });
    });

    var should404 = [
        '',
        'C0',
        'C0/suit',
        'C0/rank',
        'C0/rank/ordinal',
        'D1',
        'H64',
        'B6'
    ];
    should404.forEach(function(path) {
        it('returns 404 on invalid resource /card/' + path, function(done) {
            jsonClient.get('/card/' + path, function(err, req, res, obj) {
                expect(err).not.toBeNull();
                expect(obj).toEqual({});
                expect(res.statusCode).toBe(404);
                done();
            });
        });
    });

    it('returns 404 on requesting image for invalid resource /card/C0', function(done) {
        stringClient.get({ 'path': '/card/C0', 'headers': { 'accept': 'image/*' } },
                         function(err, req, res, obj) {
            expect(err).not.toBeNull();
            expect(obj).toEqual('');
            expect(res.statusCode).toBe(404);
            done();
        });
    });
});
