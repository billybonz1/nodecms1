var Step = require('../../models/steps');

function getsteps(req, res, next) {
    Step.getSteps(function(err, steps){
        if(err){
            throw err;
        }
        res.json(steps);
    });
}

module.exports = getsteps;
