var express = require('express');
var router = express.Router();
var game_dal = require('../model/game_dal');
var account_dal = require('../model/account_dal');


// View All games
router.get('/all', function(req, res) {
    game_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('game/gameViewAll', { 'result':result });
        }
    });

});

// View the game for the given id
router.get('/', function(req, res){
    if(req.query.game_id == null) {
        res.send('game_id is null');
    }
    else {
        game_dal.getById(req.query.game_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('game/gameViewById', {'result': result});
            }
        });
    }
});

// Return the add a new game form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('game/gameAdd', {'account': result});
        }
    });
});

// View the game for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.map_name == null) {
        res.send('Map Name must be provided.');
    }
    else if(req.query.account_id == null) {
        res.send('An account must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        game_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/game/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.game_id == null) {
        res.send('A game id is required');
    }
    else {
        game_dal.edit(req.query.game_id, function(err, result){
            res.render('game/gameUpdate', {game: result[0][0], account: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.game_id == null) {
        res.send('A game id is required');
    }
    else {
        game_dal.getById(req.query.game_id, function(err, game){
            account_dal.getAll(function(err, account) {
                res.render('game/gameUpdate', {game: game[0], account: account});
            });
        });
    }

});

router.get('/update', function(req, res){
    game_dal.update(req.query, function(err, result){
        res.redirect(302, '/game/all');
    });
});

// Delete a game for the given game_id
router.get('/delete', function(req, res){
    if(req.query.game_id == null) {
        res.send('game_id is null');
    }
    else {
        game_dal.delete(req.query.game_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/game/all');
            }
        });
    }
});

module.exports = router;