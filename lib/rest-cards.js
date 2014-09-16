var _ = require('underscore');
var restify = require('restify');
var redis = require('redis');
var Hashids = require('hashids'),
    hashids = new Hashids('rest-cards dev salt', 6);

var Card = require('./Card.js');

// Set up REST server.
var server = restify.createServer();
server.use(restify.gzipResponse());

// Set up Redis client.
var client = redis.createClient();
client.on('error', function(err) {
    console.log('Redis error: ' + err);
});

// Create reference deck, if necessary.
client.exists('ref-deck', function(err, reply) {
    if (!reply) {
        client.sadd(['ref-deck'].concat(Card.SHORTHANDS),
                    function(err, reply) {
                        if (!err)
                            console.log('Created reference deck.');
                    }
        );
    }
});

// Create new deck with the given id.  If such a deck exists, overwrite it.
server.put('/deck/:id', function(req, res, next) {
    var id = 'deck:' + req.params.id;
    client.multi()
        // Copy the reference deck into this one.
        .sunionstore(id, 'ref-deck')
        .smembers(id)
        .sadd('decks', id)
        .exec(function(err, replies) {
            if (!err) {
                res.send(201, replies[1]);
            } else {
                res.send(400);
            }
            next();
        });
});

// Create new deck and return its id.
server.post('/deck', function(req, res, next) {
    // Get the current number of hashed deck IDs, and use that to generate the next one.
    client.incr('hash-counter', function(err, n) {
        if (!err) {
            var hash = hashids.encrypt(n),
                id = 'deck:' + hash;
            // Copy the reference deck into this one.
            client.multi()
                .sunionstore(id, 'ref-deck')
                .sadd('decks', id)
                .exec(function(err, replies) {
                    if (!err) {
                        res.header('Location', req.path() + '/' + hash);
                        res.send(201);
                    } else {
                        res.send(400);
                    }
                    next();
                });
        } else {
            res.send(400);
            next();
        }
    });
});

// Get a deck by id.
server.get('/deck/:id', function(req, res, next) {
    client.exists('deck:' + req.params.id, function(err, exists) {
        if (!err && exists) {
            client.smembers('deck:' + req.params.id, function(err, reply) {
                if (!err) {
                    res.send(200, reply);
                } else {
                    res.send(404);
                }
                next();
            });
        } else {
            res.send(404);
            next();
        }
    });
});

// Get the number of cards in a deck.
server.get('/deck/:id/size', function(req, res, next) {
    var id = 'deck:' + req.params.id;
    client.sismember('decks', id, function(err, reply) {
        if (!err && reply) {
            client.scard(id, function(err, reply) {
                if (!err && reply) {
                    res.send(200, reply);
                } else {
                    res.send(400);
                }
                next();
            });
        } else {
            res.send(404);
            next();
        }
    });
});

// Draw one random card from a given deck.
server.post('/deck/:id/draw', function(req, res, next) {
    var id = 'deck:' + req.params.id;
    client.sismember('decks', id, function(err, reply) {
        if (!err && reply) {
            client.spop(id, function(err, reply) {
                if (!err && reply) {
                    res.send(200, reply);
                } else {
                    res.send(400);
                }
                next();
            });
        } else {
            res.send(404);
            next();
        }
    });
});

// Draw some number of randomly selected cards from a given deck.
server.post('/deck/:id/draw/:num', function(req, res, next) {
    // Two options here based on available Redis set operations:
    // (1) Pop (SPOP) one random card at a time.
    // (2) Get N random cards at once (SRANDMEMBER), then remove them
    //     all at once (SREM).
    // I'd expect (1) is faster for N=1, maybe N=2-3ish, but (2) faster for large N.
    // However, I'd expect most draws will often be of 1-5 cards.
    var id = 'deck:' + req.params.id;
    client.sismember('decks', id, function(err, reply) {
        if (!err && reply) {
            var query = client.multi();
            _(req.params.num).times(function() {
                query.spop(id);
            });
            query.exec(function(err, replies) {
                var drawn = replies.filter(_.negate(_.isNull));
                if (!err && !_.isEmpty(drawn)) {
                    res.send(200, drawn);
                } else {
                    res.send(400);
                }
                next();
            });
        } else {
            res.send(404);
            next();
        }
    });
});

// Get a card by shorthand.
server.get('/card/:id', function(req, res, next) {
    var card = Card.CARDS[req.params.id];
    if (card) {
        res.send(200, card);
    } else {
        res.send(404);
    }
    next();
});

// Get a card's rank.
server.get('/card/:id/rank', function(req, res, next) {
    var card = Card.CARDS[req.params.id];
    if (card) {
        res.send(200, card.rank);
    } else {
        res.send(404);
    }
    next();
});

// Get a card's ordinal rank (1-13).
server.get('/card/:id/rank/ordinal', function(req, res, next) {
    var card = Card.CARDS[req.params.id];
    if (card) {
        res.send(200, Number(card.rank));
    } else {
        res.send(404);
    }
    next();
});


// Get a card's suit.
server.get('/card/:id/suit', function(req, res, next) {
    var card = Card.CARDS[req.params.id];
    if (card) {
        res.send(200, card.suit);
    } else {
        res.send(404);
    }
    next();
});

// Dev only: get all deck ids.
server.get('/decks', function(req, res, next) {
    client.smembers('decks', function(err, reply) {
        if (!err) {
            res.send(200, reply);
        } else {
            res.send(404);
        }
        next();
    });
});

// Dev only: delete all decks. (NOTE: This includes the reference deck.)
server.del('/decks', function(req, res, next) {
    client.flushall(function(err, reply) {
        res.send(!err ? 200 : 404);
        next();
    });
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});