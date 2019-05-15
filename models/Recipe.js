const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const RecipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' //the mongoose model name defined in User.js
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        data: Buffer
    },
    name: {
        type: String
    },
    avatar:{
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar:{
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);