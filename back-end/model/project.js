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

projectSchema.pre('save', async function(next)  {
    const count = await mongoose.model('Project').countDocuments();
    this.id = count + 1;
    this.created = new Date().getTime();
    next();
});

projectSchema.pre('remove', async function(next) {
    const projects = await mongoose.model('Project').find({});
    for (let i = 0; i < projects.length; i++) {
        projects[i].id = i + 1;
        await projects[i].save();
    }
    next();
});

module.exports = mongoose.model('Project', projectSchema);
