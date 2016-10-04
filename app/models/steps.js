var mongoose = require('mongoose');

var stepsScheme = mongoose.Schema({
    label: String,
    name: String,
    categoryId: String,
    rating: Number,
    userId: Number,
    price: Number,
    currency: {type: String, default: "грн."},
    create_date: {type: Date, default: Date.now}
});
var Step = module.exports = mongoose.model('Step', stepsScheme);


//Get Step
module.exports.getSteps = function(callback, limit){
    Step.find(callback).limit(limit);
};

//Get Step By ID
module.exports.getStepById = function(id, callback){
    Step.findById(id, callback);
};

//Add Step
module.exports.addStep = function(step, callback){
    Step.create(step, callback);
};

//Update Step
module.exports.updateStep = function(id, step, options,  callback){
    var query = {_id: id};
    var update = {
        name: step.name,
        label: step.label
    };
    Step.findOneAndUpdate(query, update, options, callback);
};

//Delete Step
module.exports.deleteStep = function(id, callback){
    var query = {_id: id};
    Step.remove(query, callback);
};