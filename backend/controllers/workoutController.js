const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//GET all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;
    //pass user_id down there so it only returns workouts created by the currently logged user
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }); //sort workouts in descending order
    res.status(200).json(workouts);
}

//GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    // console.log('test');
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

    let empty_fields = [];
    if (!title)
        empty_fields.push('title');
    if (!load)
        empty_fields.push('load');
    if (!reps)
        empty_fields.push('reps');
    if (empty_fields.length > 0)
        return res.status(400).json({ error: 'Please fill in all the fields!', empty_fields });//send empty_fields so we can acces it on frontend

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, load, reps, user_id });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'no such workout' });

    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout)
        return res.status(404).json({ error: 'No such workout' });

    res.status(200).json(workout);
}

//UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, load, reps } = req.body;

    let empty_fields = [];
    if (!title)
        empty_fields.push('title');
    if (!load)
        empty_fields.push('load');
    if (!reps)
        empty_fields.push('reps');
    if (empty_fields.length > 0)
        return res.status(400).json({ error: 'Please fill in all the fields!', empty_fields });//send empty_fields so we can acces it on frontend

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'no such workout' });

    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, {
            ...req.body //spread the properties of req object
        });
        res.status(200).json(workout);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//search for a workout
const searchWorkout = async (req, res) => {
    const { data } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) { //needed this check bc if we send some random id, it'll crash 
    //     return res.status(404).json({ error: 'no such workout' });
    // }

    const workout = await Workout.find({ $text: { $search: data } });
    if (!workout)
        return res.status(404).json({ error: 'No such workout' });
    res.status(200).json(workout);
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
    searchWorkout
}