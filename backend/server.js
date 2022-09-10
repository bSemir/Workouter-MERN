require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

const app = express();  //express app, logicno

//simple middleware that fires up every time we send request 
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(express.json());//middleware that parses data from every request we send and attaches it to req object that we can use later on

//routes
app.use('/api/workouts', workoutRoutes);

//db connection, async
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db && listening on port', process.env.PORT);
        });
    }).catch((error) => {
        console.log(error);
    });
