require('dotenv').config();

const connectDB = require('./db/connectDB');
const Person = require('./model/person');
const Project = require('./model/project');
const { Kanban, Task} = require('./model/kanban&task');


const personData = require('./jsonData/personData.json');
const projectData = require('./jsonData/projectData.json');
const kanbanData = require('./jsonData/kanban.json');
const taskData = require('./jsonData/task.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await Kanban.deleteMany();
        // await Kanban.create(kanbanData);
        await Task.deleteMany();
        await Task.create(taskData);
        console.log("done")
    } catch (e) {
        console.log(e)
    }
}

start();
