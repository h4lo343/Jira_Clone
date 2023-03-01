const {Kanban, Task} = require('../model/kanban&task');
const Project = require("../model/project");
const mongoose = require("mongoose");
const CustomError = require("../error/custom-error");

const getKanban = async (req, res) => {
    const {projectId} = req.query
    if (projectId) {
        const Kanbans = await Kanban.find({projectId})
        Kanbans.sort((a, b) => a.order - b.order);
        res.status(200).json(Kanbans);
    }
    else {
        const kanbans = await Kanban.find({});
        res.status(200).json(kanbans);
    }
}

const reorder = async (req, res) => {
    const {fromId, referenceId, type} = req.body;
    const kanbanSource = await Kanban.findOne({id:fromId});
    const kanbans = await Kanban.find({projectId: kanbanSource.projectId})
    const orderedKanban = kanbans.sort((a, b) => a.order - b.order);
    const from = orderedKanban.findIndex((obj) => obj.id === fromId)
    const dest = orderedKanban.findIndex((obj) => obj.id === referenceId)

    kanbans.splice(from, 1);
    kanbans.splice(dest, 0, kanbanSource);


    for (let i=0; i<kanbans.length; i++) {
        const kanban = kanbans[i];
        kanban.order = i+1;
        kanban.save();
    }

    res.status(200).json({message: "ok"});
}

const addKanban = async (req,res) => {
    const kanbans = await Kanban.find({});
    let maxOrder = 0;
    for (let i = 0; i < kanbans.length; i++) {
        if (kanbans[i].order > maxOrder) {
            maxOrder = kanbans[i].order;
        }
    }
    req.body.order = maxOrder + 1;
    const count = kanbans.length;
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
    deleteKanban,
    reorder
}
