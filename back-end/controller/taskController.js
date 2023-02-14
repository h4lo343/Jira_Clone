const {Task} = require('../model/kanban&task');
const Project = require('../model/project');
const CustomError = require("../error/custom-error");

const getTask = async (req, res) => {
    const {projectId, typeId, processorId, name} = req.query;
    const queryObject = {};
    console.log(req.query)
    queryObject.projectId = projectId;
    if (processorId && processorId !== 0) {
        queryObject.processorId = processorId
    }
    if (typeId && typeId!==0) {
        if (typeId===2) {
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
            id: task._id,
            name: task.type
        }
    })
    res.status(200).json(TaskTypes);
}

module.exports = {
    getTask,
    getTaskTypes
}
