var mongoose = require('mongoose');
var config = require('./main');

// connect to db
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
