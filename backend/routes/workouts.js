const express = require('express');

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
    searchWorkout
} = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
//now, requireAuth will go through every workout route 
router.use(requireAuth);

//GET all workouts
router.get('/', getWorkouts);

//GET a single workout
router.get('/:id', getWorkout);

//POST a new workout
router.post('/', createWorkout);

//DELETE workout
router.delete('/:id', deleteWorkout);

//UPDATE a workout
router.patch('/:id', updateWorkout);

//SEARCH a workout
router.get('/find/:data', searchWorkout);
module.exports = router;