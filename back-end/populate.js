require('dotenv').config();

const connectDB = require('./db/connectDB');
const Person = require('./model/person');
const Project = require('./model/project');

const personData = require('./personData.json');
const projectData = require('./projectData.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Person.deleteMany();
        await Person.create(personData);
        await Project.deleteMany();
        await Project.create(projectData);
        console.log("done")
    } catch (e) {
        console.log(e)
    }
}

start();
