var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM game_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(game_id, callback) {
    var query = 'SELECT * FROM game_view WHERE game_id = ?';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Game (map_name, attack_defense, account_id) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.map_name, params.attack_defense, params.account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(game_id, callback) {
    var query = 'DELETE FROM Game WHERE game_id = ?';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};