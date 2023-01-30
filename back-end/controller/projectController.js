const Project = require('../model/project');
const Person = require('../model/person');
const CustomError = require('../error/custom-error');

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


const updateProject = async (req, res) => {
    const {id, ...config} = req.body


    const newProject = await Project.findOneAndUpdate(
        {id: id},
        config
    )
    if (!newProject) {
        throw new CustomError("No Project Found", 404);
    }

    res.status(200).json(newProject);
}

module.exports = {
    getProject,
    updateProject
}
