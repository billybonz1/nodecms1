var functions = require('../../functions');
var Step = require('../../models/steps');

function addstep(req, res, next) {
    var step = {
        name: functions.urlTranslit(req.body.label),
        price: req.body.price,
        currency: req.body.currency,
        label: req.body.label,
        desc: req.body.desc,
        userID: req.user._id,
        username: req.user.username
    };
    Step.addStep(step, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
}

module.exports = addstep;
