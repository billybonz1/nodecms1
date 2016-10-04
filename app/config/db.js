var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/OneStep');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


userScheme = mongoose.Schema({
    email: String,
    encryptedPassword: String,
    role: {type: String, default: 'User'}
});


