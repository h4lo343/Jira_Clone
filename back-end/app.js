require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connectDB');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/error-handler');
const personRouter = require('./Routes/Person');
const projectRouter = require('./Routes/Project');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', personRouter);
app.use('/projects', projectRouter);

app.use(notFound);
app.use(errorHandler);


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, () => {
            console.log(`Server is listening on port 3000...`)
        })
    }catch (error) {
        console.log(error);
    }
}

start();
