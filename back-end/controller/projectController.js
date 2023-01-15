const Project = require('../model/project');


const getProject = async (req, res) => {
    const { name, personId } = req.query;
    const queryObject = {};

    if (name) {
        queryObject.name = name;
    }
    if (personId) {
        queryObject.personId = personId;
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
