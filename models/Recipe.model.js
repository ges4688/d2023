var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    urlImage: {type: String, required: true},
    ingredients: {type: Array, "default": [] },
    difficulty: {type: String, required: true},
    vegan: {type: Boolean, default: false},
    celiac: {type: Boolean, default: false},
    user: {type: mongoose.Types.ObjectId, required: true},
    steps: {type: Array, "default": [] },
    category: {type: String, required: true},
    rating: {type: Array, "default": [] },
    status: {type: String, "default": 'active'}
});

RecipeSchema.plugin(mongoosePaginate);
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;