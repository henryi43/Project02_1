var express = require('express');
var router = express.Router();
var dva_dal = require('../model/dva_dal');
var game_dal = require('../model/game_dal');


// View All dvas
router.get('/all', function(req, res) {
    dva_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('dva/dvaViewAll', { 'result':result });
        }
    });

});

// View the dva for the given id
router.get('/', function(req, res){
    if(req.query.game_id == null) {
        res.send('game_id is null');
    }
    else {
        dva_dal.getById(req.query.game_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('dva/dvaViewById', {'result': result});
            }
        });
    }
});

// Return the add a new dva form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    game_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('dva/dvaAdd', {'game': result});
        }
    });
});

// View the dva for the given id
router.get('/insert', function(req, res){
    // simple validation
    // if(req.query.map_name == null) {
    //     res.send('Map Name must be provided.');
    // }
    if(req.query.game_id == null) {
        res.send('A game id must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        dva_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/dva/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.game_id == null) {
        res.send('A game id is required');
    }
    else {
        dva_dal.edit(req.query.game_id, function(err, result){
            res.render('dva/dvaUpdate', {dva: result[0][0], game: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.game_id == null) {
        res.send('A game id is required');
    }
    else {
        dva_dal.getById(req.query.game_id, function(err, dva){
            game_dal.getAll(function(err, game) {
                res.render('dva/dvaUpdate', {dva: dva[0], game: game});
            });
        });
    }

});

router.get('/update', function(req, res){
    dva_dal.update(req.query, function(err, result){
        res.redirect(302, '/dva/all');
    });
});

// Delete a dva for the given game_id
router.get('/delete', function(req, res){
    if(req.query.game_id == null) {
        res.send('game_id is null');
    }
    else {
        dva_dal.delete(req.query.game_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/dva/all');
            }
        });
    }
});

module.exports = router;