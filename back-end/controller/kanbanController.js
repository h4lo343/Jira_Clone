const {Kanban, Task} = require('../model/kanban&task');
const Project = require("../model/project");

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



module.exports = {
    getKanban
}
