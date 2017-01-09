var Step = require('../../models/steps');

function getStepById(req, res, next) {
    Step.getStepById(req.params._id, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
}

module.exports = getStepById;
