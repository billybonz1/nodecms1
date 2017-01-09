var functions = require('../../functions');
var Step = require('../../models/steps');

function editstep(req, res, next) {
    var stepId = req.params._id;


    function updateStep(stepId){
      var step = {
          name: functions.urlTranslit(req.body.label),
          price: req.body.price,
          currency: req.body.currency,
          label: req.body.label,
          desc: req.body.desc
      };
      Step.updateStep(stepId, step, {}, function(err, step){
          if(err){
              throw err;
          }
          res.json(step);
      });
    }

    // Проверка на прнадлежности СТЕПА текущему пользователю
    Step.getStepById(stepId, function(err, step){
        if(err){
            throw err;
        }
        if(step.userID == req.user._id){
          updateStep(stepId);
        }else{
          res.json({
            success: false
          });
        }
    });
}

module.exports = editstep;
