const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Achievement = mongoose.model('achievement', AchievementSchema);