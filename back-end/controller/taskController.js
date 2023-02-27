const {Task, Kanban} = require('../model/kanban&task');
const Project = require('../model/project');
const CustomError = require("../error/custom-error");
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
    const {projectId, typeId, processorId, name} = req.query;
    const queryObject = {};
    queryObject.projectId = projectId;
    if (processorId && processorId !== "0") {
        queryObject.processorId = processorId
    }
    if (typeId) {
        if (typeId==="2") {
            queryObject.type = "task"
        }
        else if (typeId==="1") {
            queryObject.type = "bug"
        }
    }
    if (name) {
        queryObject.name = name;
    }

    const Tasks = await Task.find(queryObject);
    res.status(200).json(Tasks);

    if (!Tasks) {
        throw new CustomError("No Project Found", 404);
    }
}

const getTaskTypes = async (req, res) => {
    const Tasks = await Task.find({});
    const TaskTypes = Tasks.map((task) => {
        return {
            id: task.id,
            name: task.type
        }
    })
    res.status(200).json(TaskTypes);
}

const addTask = async (req,res) => {
    const count = await mongoose.model('Task').countDocuments();
    if (req.body.typeId === "2") {
        req.body.type = "task"
    }
    else {
        req.body.type = "bug"
    }
    req.body.id = count + 1;
    const newTask = await Task.create(req.body)
    res.status(201).send(newTask);
}

const getTask = async (req, res) => {
    const result = await  Task.findOne({id: req.params.id})
    if(!result) {
        throw new CustomError("No task Found", 404);
    }
    res.status(200).json(result);
}

const updateTask = async (req, res) => {

    const {id} = req.params
    const config = req.body;

    if (config.typeId === 2) {
        config.type = "task"
    }else {
        config.type = "bug"
    }
    console.log(config)
    const newTask = await Task.findOneAndUpdate(
        {id},
        config
    )
    if (!newTask) {
        throw new CustomError("No Task Found", 404);
    }

    res.status(200).json(newTask);
}

const deleteTask = async (req, res) => {
    const {id} = req.params

    const task = await Task.findOne({id});

    if (!task) {
        throw new CustomError("No Project Found", 404);
    }

    task.remove();

    res.status(200).json({message: "ok"});
}

module.exports = {
    getTasks,
    getTaskTypes,
    addTask,
    getTask,
    updateTask,
    deleteTask
}
