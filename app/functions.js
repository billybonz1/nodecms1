var crypto = require('crypto');
var appSecret = "Niva666";
var functions = {
    encryptedPassword: function(pass){
        return crypto.createHmac('sha256',appSecret).update(pass).digest('hex')
    }
};

module.exports = functions;