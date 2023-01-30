const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'need an id for project'],
        unique: true
    },
    personId: {
        type: Number,
        required: [true, 'need an id for person'],
    },
    name: {
        type: String
    },
    organization: {
        type: String
    },
    created: {
        type: Date
    },
    pin: {
        type: Boolean,
        required: [true, 'need pin for project'],
    }
})

module.exports = mongoose.model('Project', projectSchema);
