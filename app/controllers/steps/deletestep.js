var Step = require('../../models/steps');

function deletestep(req, res, next) {
    var stepId = req.params._id;

    function deleteStep(stepId){
      Step.deleteStep(stepId, function(err, step){
          if(err){
              throw err;
          }
          res.json(step);
      });
    }
    // Check creator of step
    Step.getStepById(stepId, function(err, step){
        if(err){
            throw err;
        }
        if(step.userID == req.user._id){
          deleteStep(stepId);
        }else{
          res.json({
            success: false
          });
        }
    });
}


module.exports = deletestep;
