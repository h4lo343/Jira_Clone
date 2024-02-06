const mongoose = require('mongoose');

const epicSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'please give id of the person'],

    },
    name: {
        type: String,
        required: [true, 'please give name of the epic'],
    },
    projectId: {
        type: Number,
        required: [true, 'Please provide projectId']
    },
    start: {
        type: Number,
        required: [true, 'Please provide start time']
    },
    end: {
        type: Number,
        required: [true, 'Please provide end time']
    }
})

epicSchema.post('remove',async function(next) {
    const epics = await mongoose.model('Epic').find({});
    for (let i = 0; i < epics.length; i++) {
        epics[i].id = i + 1;
        await epics[i].save();
    }
});


module.exports = mongoose.model('Epic', epicSchema);
