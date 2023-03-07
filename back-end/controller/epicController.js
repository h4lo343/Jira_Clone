const Epic = require('../model/epic');
const CustomError = require("../error/custom-error");
const {model} = require("mongoose");
const {Kanban} = require("../model/kanban&task");

const getEpic = async (req, res) => {
    const { projectId } = req.query;
    const queryObject = {};

    if (projectId) {
        queryObject.projectId = projectId;
    }

    const result = await Epic.find(queryObject);
    if(result.length == 0) {
        throw new CustomError("No Epic Found", 404);
    }

    res.status(200).json(result);
}

const addEpic = async (req, res) => {
    const value = {}
    value.name = req.body.name
    value.projectId = req.body.projectId
    value.start = new Date().getTime();
    value.end = new Date().getTime();
    await Epic.find({}).then(res => {value.id = res.length + 1});

    await Epic.create(value)
    res.status(200).json({message: "OK"});
}

const deleteEpic = async (req, res) => {
    const {id} = req.params

    const epic = await Epic.findOne({id});

    if (!epic) {
        throw new CustomError("No Project Found", 404);
    }

    epic.remove();

    res.status(200).json({message: "ok"});
}

module.exports= {
    getEpic,
    addEpic,
    deleteEpic
}
