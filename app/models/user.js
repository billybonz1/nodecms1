var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// User Schema
var UserSchema = new mongoose.Schema({
   email: {
       type: String,
       lowercase: true,
       unique: true,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   encryptedPassword: String,
   role: {
       type: String,
       enum: ['User', 'Manager', 'Admin'],
       default: ['User']
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   avatar: {
      type: String
   },
   oneLineStory: {
      type: String
   },
   skills: {
      type: Array
   },
   desc: {
      type: String
   }
});

// Save the user's hashed password

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null,function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password

UserSchema.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.updateUserAvatar = function(id, avatarPath, callback){
    User.update({ _id: id }, { $set: { avatar: avatarPath }}, callback);
};

module.exports.updateOneLineStory = function(id, oneLineStory, callback){
    User.update({ _id: id }, { $set: { oneLineStory: oneLineStory }}, callback);
};

module.exports.updateUserDescription = function(id, desc, callback){
    User.update({ _id: id }, { $set: { desc: desc }}, callback);
};


module.exports.updateSkills = function(id, skills, callback){
    User.update({ _id: id }, { $set: { skills: skills }}, callback);
};
