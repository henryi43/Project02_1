var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getAll = function(callback) {
    var query = 'SELECT * FROM dva_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(game_id, callback) {
    var query = 'SELECT * FROM dva_view WHERE game_id = ?';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO DVA (game_id, eliminations, damage_done, objective_kills, objective_time, win_or_lose, deaths) VALUES ( ?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.game_id, params.eliminations, params.damage_done, params.objective_kills, params.objective_time, params.win_or_lose, params.deaths];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(game_id, callback) {
    var query = 'DELETE FROM DVA WHERE game_id = ?';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE DVA SET map_name = ?, game_id = ? WHERE game_id = ?';
    var queryData = [params.map_name, params.game_id, params.game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS dva_getinfo;
 DELIMITER //
 CREATE PROCEDURE dva_getinfo (game_id int)
 BEGIN
 SELECT * FROM DVA WHERE game_id = game_id;
 SELECT g.*, game_id FROM Game g
 LEFT JOIN DVA d on d.game_id = g.game_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL dva_getinfo (4);
 */

exports.edit = function(game_id, callback) {
    var query = 'CALL dva_getinfo(?)';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};