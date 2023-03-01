const Project = require('../model/project');
const Person = require('../model/person');
const CustomError = require('../error/custom-error');
const e = require("express");
const mongoose = require("mongoose");

const getProject = async (req, res) => {
    const { name, personId } = req.query;
    const queryObject = {};

    if (personId) {
        queryObject.personId = personId;
    }

    if (name) {
        const peojectByName = await Project.findOne({name});
        const projectName = peojectByName?.name;
        queryObject.name = projectName;
    }

    const result = await Project.find(queryObject);
    if(result.length == 0) {
        throw new CustomError("No Project Found", 404);
    }


    res.status(200).json(result);
}

const getProjectById = async (req, res) => {
    const result = await  Project.findOne({id: req.params.id})
    if(!result) {
        throw new CustomError("No Project Found", 404);
    }
    res.status(200).json(result);
}


const addProject = async (req,res) => {
    const count = await mongoose.model('Project').countDocuments();
    req.body.id = count + 1;
    req.body.created = new Date();
    const newProject = await Project.create(req.body)
    res.status(201).send(newProject);
}

const updateProject = async (req, res) => {

        const {id} = req.params
        const config = req.body;

        const newProject = await Project.findOneAndUpdate(
            {id},
            config
        )
        if (!newProject) {
            throw new CustomError("No Project Found", 404);
        }

        res.status(200).json(newProject);
}

const deleteProjectById= async (req, res) => {
    const {id} = req.params
    const project = await Project.findOne({id});

    if (!project) {
        throw new CustomError("No Project Found", 404);
    }

    project.remove();

    res.status(200).json({message: "ok"});
}

module.exports = {
    getProject,
    updateProject,
    getProjectById,
    addProject,
    deleteProjectById
}
