const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'please give id of the person'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'please give name of the person'],
    }
})

module.exports = mongoose.model('Person', personSchema);
