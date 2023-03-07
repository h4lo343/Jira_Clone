require('dotenv').config();

const connectDB = require('./db/connectDB');
const Person = require('./model/person');
const Project = require('./model/project');
const Epic = require('./model/epic');

const { Kanban, Task} = require('./model/kanban&task');


const personData = require('./jsonData/personData.json');
const projectData = require('./jsonData/projectData.json');
const kanbanData = require('./jsonData/kanban.json');
const task = require('./jsonData/task.json');
const epicData = require('./jsonData/epic.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Kanban.deleteMany();
        await Kanban.create(kanbanData);
        await Project.deleteMany();
        await Project.create(projectData);
        await Task.deleteMany();
        await Task.create(task);
        await Epic.deleteMany();
        await Epic.create(epicData);
        console.log("done")
    } catch (e) {
        console.log(e)
    }
}

start();
