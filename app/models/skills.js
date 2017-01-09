var mongoose = require('mongoose');

var stepsScheme = mongoose.Schema({
    label: {
      type: String,
      unique: true
    }
});
var Skills = module.exports = mongoose.model('Skill', stepsScheme);


module.exports.addSkill = function(skill, callback){
    Skills.create(skill, callback);
};
