var restify = require('restify');

describe('rest-cards /deck/', function() {
    var client = restify.createJsonClient({
        'url': 'http://localhost:' + (process.env.PORT || 8080)
    });

    var decks = {};

    describe('creation', function() {
        it('creates a new full deck by ID', function(done) {
            client.put('/deck/testdeck', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(201);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(jasmine.any(Array));
                expect(obj.length).toEqual(52);
                obj.forEach(function(card) {
                    expect(card).toEqual(jasmine.any(String));
                    expect(card.length).toEqual(8); // e.g. '/card/D3'
                });
                decks['/deck/testdeck'] = 52;
                done();
            });
        });

        it('overwrites an existing deck with a full one', function(done) {
            client.put('/deck/testdeck', function(err, req, res, obj) {
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

        it('creates and names a new full deck', function(done) {
            client.post('/deck', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(201);
                expect(res.headers['location']).toBeDefined();
                decks[res.headers['location']] = 52;
                done();
            });
        });

        it('creates a new partial deck by ID', function(done) {
            client.put('/deck/testpartialdeck',
                       ['/card/D3', '/card/QH', '/card/9D'],
                       function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(201);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(jasmine.any(Array));
                console.log(obj.length);
                expect(obj.length).toEqual(3);
                obj.forEach(function(card) {
                    expect(card).toEqual(jasmine.any(String));
                    expect(card.length).toEqual(8); // e.g. '/card/D3'
                });
                decks['/deck/testpartialdeck'] = 3;
                done();
            });
        });

        it('overwrites an existing deck with a partial one', function(done) {
            client.put('/deck/testpartialdeck',
                       ['/card/D3', '/card/QH'],
                       function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(jasmine.any(Array));
                expect(obj.length).toEqual(2);
                obj.forEach(function(card) {
                    expect(card).toEqual(jasmine.any(String));
                    expect(card.length).toEqual(8); // e.g. '/card/D3'
                });
                done();
            });
        });

        it('creates and names a new partial deck', function(done) {
            client.post('/deck',
                       ['/card/D3', '/card/QH', '/card/9D'],
                       function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(201);
                expect(res.headers['location']).toBeDefined();
                decks[res.headers['location']] = 3;
                done();
            });
        });
    });

    describe('retrieval', function() {
        Object.keys(decks).forEach(function(path) {
            it('gets a deck by ID (' + path + ')', function(done) {
                client.get(path, function(err, req, res, obj) {
                    expect(err).toBeNull();
                    expect(res.statusCode).toBe(200);
                    expect(res.headers['content-type']).toEqual('application/json');
                    expect(obj).toEqual(jasmine.any(Array));
                    expect(obj.length).toEqual(decks[path]);
                    obj.forEach(function(card) {
                        expect(card).toEqual(jasmine.any(String));
                        expect(card.length).toEqual(8); // e.g. '/card/D3'
                    });
                    done();
                });
            });

            it('gets a deck size (' + path + ')', function(done) {
                client.get(path + '/size', function(err, req, res, obj) {
                    expect(err).toBeNull();
                    expect(res.statusCode).toBe(200);
                    expect(res.headers['content-type']).toEqual('application/json');
                    expect(obj).toEqual(decks[path]);
                    done();
                });
            });
        });

        var errorByInput = {
            'fakedeck': 404,
            'fakedeck/size': 404
        };
        Object.keys(errorByInput).forEach(function(path) {
            it('returns 404 on invalid resource /card/' + path, function(done) {
                client.get('/deck/' + path, function(err, req, res, obj) {
                    expect(err).not.toBeNull();
                    expect(obj).toEqual({});
                    expect(res.statusCode).toBe(errorByInput[path]);
                    done();
                });
            });
        });
    });

    describe('drawing', function() {
        it('draws a card from a deck', function(done) {
            client.post('/deck/testdeck/draw', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(jasmine.any(String));
                expect(obj.length).toEqual(8); // e.g. '/card/D3'
                done();
            });
        });

        it('updates deck size after drawing card', function(done) {
            client.get('/deck/testdeck/size', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(51);
                done();
            });
        });

        it('draws three cards from a deck', function(done) {
            client.post('/deck/testdeck/draw/3', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(jasmine.any(Array));
                expect(obj.length).toEqual(3);
                obj.forEach(function(card) {
                    expect(card).toEqual(jasmine.any(String));
                    expect(card.length).toEqual(8); // e.g. '/card/D3'
                });
                done();
            });
        });

        it('updates deck size after drawing three cards', function(done) {
            client.get('/deck/testdeck/size', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(48);
                done();
            });
        });

        it('draws as many cards as possible up to number requested', function(done) {
            client.post('/deck/testdeck/draw/49', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toEqual('application/json');
                expect(obj).toEqual(jasmine.any(Array));
                expect(obj.length).toEqual(48);
                done();
            });
        });

        var errorByInput = {
            'fakedeck/draw': 404,
            'fakedeck/draw/3': 404,
            'testdeck/draw': 400,
            'testdeck/draw/3': 400
        };
        Object.keys(errorByInput).forEach(function(path) {
            var code = errorByInput[path];
            it('returns ' + code + ' on invalid request /card/' + path, function(done) {
                client.post('/deck/' + path, function(err, req, res, obj) {
                    expect(err).not.toBeNull();
                    expect(obj).toEqual({});
                    expect(res.statusCode).toBe(code);
                    done();
                });
            });
        });
    });

    describe('deletion', function() {
        it('deletes an empty deck', function(done) {
            client.del('/deck/testdeck', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(204);
                expect(obj).toEqual({});
                done();
            });
        });

        it('deletes a nonempty deck', function(done) {
            client.del('/deck/testpartialdeck', function(err, req, res, obj) {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(204);
                expect(obj).toEqual({});
                done();
            });
        });

        it('returns 404 on invalid resource', function(done) {
            client.del('/deck/fakedeck', function(err, req, res, obj) {
                expect(err).not.toBeNull();
                expect(res.statusCode).toBe(404);
                expect(obj).toEqual({});
                done();
            });
        });
    });
});
