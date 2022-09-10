const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }); //sort workouts in descending order
    res.status(200).json(workouts);
}

//GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { //needed this check bc if we send some random id, it'll crash 
        return res.status(404).json({ error: 'no such workout' });
    }

    const workout = await Workout.findById(id);

    if (!workout)
        return res.status(404).json({ error: 'No such workout' });
    res.status(200).json(workout);
}

//create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    
    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//DELETE a workout

//UPDATE a workout

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts
}