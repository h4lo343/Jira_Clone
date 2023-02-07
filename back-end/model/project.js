const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: {
        type: Number,
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
        default: false,
        required: [true, 'need pin for project'],
    }
});

projectSchema.post('remove',async function(next) {
    const projects = await mongoose.model('Project').find({});

    for (let i = 0; i < projects.length; i++) {
        projects[i].id = i + 1;
        await projects[i].save();
    }

});



module.exports = mongoose.model('Project', projectSchema);
