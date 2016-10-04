var mongoose = require('mongoose');

var categoryScheme = mongoose.Schema({
    label: String,
    name: String,
    desc: {type: String, default: null},
    parentId: {type: String, default: null},
    depth: {type: Number, default: 0},
    img_url: {type: String, default: null}
});

var Category = module.exports = mongoose.model('Category', categoryScheme);

// Get categories
module.exports.getCategories = function(callback, limit){
    Category.find(callback).limit(limit);
};


//Add category
module.exports.addCategory = function(category, callback){
    Category.create(category, callback);
};


//Update category
module.exports.updateCategory = function(id, category, options,  callback){
    var query = {_id: id};
    var update = {
        name: category.name,
        label: category.label
    };
    Category.findOneAndUpdate(query, update, options, callback);
};

//Delete category
module.exports.deleteCategory = function(id, callback){
    var query = {_id: id};
    Category.remove(query, callback);
};
