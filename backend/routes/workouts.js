const express = require('express');

const {
    createWorkout,
    getWorkout,
    getWorkouts
} = require('../controllers/workoutController');

const router = express.Router();

//GET all workouts
router.get('/', getWorkouts);

//GET a single workout
router.get('/:id', getWorkout);

//POST a new workout
router.post('/', createWorkout);

//DELETE workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'});
});

//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new workout'});
});

module.exports = router;