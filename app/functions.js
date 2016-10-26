"use strict";
var crypto = require("crypto");
var translit = require("transliteration.cyr");
var appSecret = "Niva666";
var functions = {
    encryptedPassword: function (pass) {
        return crypto.createHmac("sha256", appSecret).update(pass).digest("hex");
    },
    urlTranslit: function (string) {
        var text = string.toLowerCase().replace(new RegExp(" ", "g"), "-");
        return translit.transliterate(text);
    }
};

module.exports = functions;