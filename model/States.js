const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateCode: {
        type: String, 
        required: true,
        unique: true
    },
    funfact: {
        type: Array, 
        required: true
    }
});

module.exports = mongoose.model('State', stateSchema);
