const {Kanban, Task} = require('../model/kanban&task');
const Project = require("../model/project");
const mongoose = require("mongoose");
const CustomError = require("../error/custom-error");

const getKanban = async (req, res) => {
    const {projectId} = req.query
    if (projectId) {
        const Kanbans = await Kanban.find({projectId})
        res.status(200).json(Kanbans);
    }
    else {
        const kanbans = await Kanban.find({});
        res.status(200).json(kanbans);
    }
}

const addKanban = async (req,res) => {
    const count = await mongoose.model('Kanban').countDocuments();
    req.body.id = count + 1;
    const newKanban = await Kanban.create(req.body)
    res.status(201).send(newKanban);
}

const deleteKanban = async (req, res) => {
    const {id} = req.params

    const kanban = await Kanban.findOne({id});

    if (!kanban) {
        throw new CustomError("No Project Found", 404);
    }

    kanban.remove();

    res.status(200).json({message: "ok"});
}


module.exports = {
    getKanban,
    addKanban,
    deleteKanban
}
