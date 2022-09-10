import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext(); //destructure dispatch from useWorkoutsContext hook
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!json.ok)
            setError(json.error);
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);

            /* bitno: when we've added a new workout from our form,
            we needed to dispatch an action which is going to update our context state as well(add new workout to global context state),
            that way we are keeping up UI in sync with db!! */
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Excersice Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm