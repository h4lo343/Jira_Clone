require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connectDB');

const app = express();

app.use(express.json());

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(4000, () => {
            console.log(`Server is listening on port 4000...`)
        })
    }catch (error) {
        console.log(error);
    }
}

start();
