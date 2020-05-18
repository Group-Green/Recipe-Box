const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipe_schema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    main_ingredients: {
        type: [],
        required: true
    },
    sub_ingredients: {
        type: []
    },
    instructions: {
        type: String,
        required: true
    },
    notes: String,
    public: {
        type: Boolean,
        required: true
    }
});

const Recipe = mongoose.model('recipes', recipe_schema);

module.exports = Recipe;