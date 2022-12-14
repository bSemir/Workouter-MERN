const mongoose = require('mongoose');

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: { //every workout must be associated with a user
        type: String,
        required: true
    }
}, { timestamps: true });

workoutSchema.index({ '$**': 'text' });
//workoutSchema.index({ reps: 'Number' }); aint working

module.exports = mongoose.model('Workout', workoutSchema); //model

