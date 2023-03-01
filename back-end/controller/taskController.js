const {Task, Kanban} = require('../model/kanban&task');
const Project = require('../model/project');
const CustomError = require("../error/custom-error");
const mongoose = require("mongoose");

const reorder = async (req, res) => {
    const {fromId, referenceId, type} = req.body;
    const TaskSource = await Task.findOne({id:fromId});
    const Tasks = await Task.find({kanbanId: TaskSource.kanbanId})
    const orderedTasks = Tasks.sort((a, b) => a.order - b.order);
    const from = orderedTasks.findIndex((obj) => obj.id === fromId)
    const dest = orderedTasks.findIndex((obj) => obj.id === referenceId)

    Tasks.splice(from, 1);
    Tasks.splice(dest, 0, TaskSource);

    for (let i=0; i<Tasks.length; i++) {
        const task = Tasks[i];
        task.order = i+1;
        task.save();
    }

    res.status(200).json({message: "ok"});
}


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

    Tasks.sort((a, b) => a.order - b.order);
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
    const tasks = await Task.find({});
    let maxOrder = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].order > maxOrder) {
            maxOrder = tasks[i].order;
        }
    }
    req.body.order = maxOrder + 1;
    const count = await Task.countDocuments();
    if (req.body.typeId === "2") {
        req.body.type = "task"
    }
    else {
        req.body.type = "bug"
    }
    req.body.id = count + 1;
    const newTask = await Task.create(req.body)
    res.status(201).send(newTask);
    req.body.order = count + 1;
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
    deleteTask,
    reorder
}
