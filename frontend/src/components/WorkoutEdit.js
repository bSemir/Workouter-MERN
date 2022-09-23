import React, { useState, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutEdit = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            //json is array of objects
            if (response.ok) {
                console.log(json);
                setTitle(json.title);
                setLoad(json.load);
                setReps(json.reps);
            }
        }
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, id, user]) //whenever dispatch, id, user change, it reruns useEffect

    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = { title, reps, load };

        const response = await fetch('/api/workouts/' + id, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json(); //document that was returned from db

        if (!json.ok) {
            setError(json.error);
            setEmptyFields(json.empty_fields);
        }

        if (response.ok) {
            console.log(json);
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'PATCH_WORKOUT', payload: json });

            navigate('/', { replace: true });
        }
    }

    return (
        <form className="create" onSubmit={handleUpdate}>
            <h3>Update Your workout</h3>
            <label>Excercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Update</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutEdit