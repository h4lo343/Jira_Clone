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
})

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
    }
})

module.exports = {
    Kanban: mongoose.model('Kanban', kanbanSchema),
    Task: mongoose.model('Task', taskSchema)
}

