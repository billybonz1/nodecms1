var functions = require('../../functions');
var Step = require('../../models/steps');

function usersteps(req, res, next) {
  var query = {};
  query.username = req.params._username;
  Step.find(query, function(error, steps){
       if(error) {
         return res.status(400).send({msg:"Ошибка при поиске."});
       }
       return res.status(200).send(steps);
  });
}


module.exports = usersteps;
