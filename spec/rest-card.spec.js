var restify = require('restify');

describe('rest-cards /card/', function() {
    var client = restify.createJsonClient({
        'url': 'http://localhost:8080'
    });

    it('gets a card by shorthand', function(done) {
        client.get('/card/D3', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(obj.rank).toBeDefined();
            expect(obj.rank).toEqual('three');
            expect(obj.suit).toBeDefined();
            expect(obj.suit).toEqual('diamonds');
            done();
        });
    });

    it('gets a card\'s suit', function(done) {
        client.get('/card/D3/suit', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(obj).toBe('diamonds');
            done();
        });
    });

    it('gets a card\'s rank', function(done) {
        client.get('/card/D3/rank', function(err, req, res, obj) {
            expect(err).toBeNull();
            expect(obj).toBe('three');
            done();
        });
    });

    it('gets a card\'s ordinal rank', function(done) {
        client.get('/card/D3/rank/ordinal', function(err, req, res, obj) {
            expect(err).toBeNull();
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
            client.get('/card/' + path, function(err, req, res, obj) {
                expect(err).not.toBeNull();
                expect(obj).toEqual({});
                expect(res.statusCode).toBe(404);
                done();
            });
        });
    });
});
