const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekplanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' //the mongoose model name defined in User.js
    },    
    name: {
        type: String
    },
    text: {
        type: String
    },
    image: {
        type: String,
        data: Buffer
    },
    date: {
        type: Date,
        default: Date.now
    },
    monday: {
        type: Schema.Types.ObjectId,
        ref: 'recipe' //the mongoose model name defined in recipe.js
    },
    tuesday:{
        type: Schema.Types.ObjectId,
        ref: 'recipe' //the mongoose model name defined in recipe.js
    },
    wednesday:{
        type: Schema.Types.ObjectId,
        ref: 'recipe' //the mongoose model name defined in recipe.js
    },
    thursday:{
        type: Schema.Types.ObjectId,
        ref: 'recipe' //the mongoose model name defined in recipe.js
    },
    friday:{
        type: Schema.Types.ObjectId,
        ref: 'recipe' //the mongoose model name defined in recipe.js
    },
    saturday:{
        type: Schema.Types.ObjectId,
        ref: 'recipe' //the mongoose model name defined in recipe.js
    },
    sunday:{
        type: Schema.Types.ObjectId,
        ref: 'recipe' //the mongoose model name defined in recipe.js
    }
});

module.exports = Weekplan = mongoose.model('week', WeekplanSchema);