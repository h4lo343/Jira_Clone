require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connectDB');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/error-handler');
const personRouter = require('./Routes/Person');
const projectRouter = require('./Routes/Project');
const authRouter = require('./Routes/auth');
const kanbanRouter = require('./Routes/kanban');
const taskRouter = require('./Routes/task');
const epicRouter = require('./Routes/epic')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', personRouter);
app.use('/projects', projectRouter);
app.use('/auth', authRouter);
app.use('/kanbans', kanbanRouter);
app.use('/tasks', taskRouter);
app.use('/epics', epicRouter)


app.use(notFound);
app.use(errorHandler);


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT || 3000 , () => {
            console.log(`Server is listening on port 3000...`)
        })
    }catch (error) {
        console.log(error);
    }
}

start();

