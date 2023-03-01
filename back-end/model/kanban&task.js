const mongoose = require('mongoose');

const kanbanSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide taskId'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please provide status']
    },
    projectId: {
        type: Number,
        required: [true, 'Please provide projectId']
    },
    order: {
        type: Number,
        required: [true, 'Please provide order']
    }
})

kanbanSchema.post('remove',async function(next) {
    const kanbans = await mongoose.model('Kanban').find({});

    for (let i = 0; i < kanbans.length; i++) {
        kanbans[i].id = i + 1;
        await kanbans[i].save();
    }
});

const taskSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide taskId'],
        unique: true
    },
    kanbanId: {
        type: Number,
        ref: "Kanban",
        required: [true, 'Please provide kanbanId']
    },
    name: {
        type: String,
        required: [true, 'Please provide name of task']
    },
    projectId: {
        type: Number,
        ref: "Project",
        required: [true, 'Please provide projectId']
    },
    type: {
        type: String,
        enum: ["task", "bug"],
        required: [true, 'Please provide type of task']
    },
    processorId: {
        type: Number,
        required: [true, 'Please provide processor Id']
    },
    order: {
        type: Number,
        required: [true, 'Please provide order']
    }
})

taskSchema.post('remove',async function(next) {
    const tasks = await mongoose.model('Task').find({});
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i + 1;
        await tasks[i].save();
    }
});


module.exports = {
    Kanban: mongoose.model('Kanban', kanbanSchema),
    Task: mongoose.model('Task', taskSchema)
}

