var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/OneStep');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


userScheme = mongoose.Schema({
    email: String,
    encryptedPassword: String,
    role: {type: String, default: 'User'}
});

categoryScheme = mongoose.Schema({
    name: String,
    desc: String,
    parentId: {type: String, default: null},
    depth: {type: Number, default: 0},
    img_url: String
});

stepsScheme = mongoose.Schema({
    name: String,
    categoryId: String,
    rating: Number,
    userId: Number,
});

