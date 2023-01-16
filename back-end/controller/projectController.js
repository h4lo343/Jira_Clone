const Project = require('../model/project');
const Person = require('../model/person');

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
    if(!result) {
        throw new CustomError("no project found", 404);
    }
    res.status(200).json(result);
}

module.exports = {
    getProject
}
