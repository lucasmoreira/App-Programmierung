var express = require('express');
var netApi = require('net-browserify');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'database-1.clsd7nrbhmct.eu-central-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'adminHAW',
  database : 'sys'
});

connection.connect();
