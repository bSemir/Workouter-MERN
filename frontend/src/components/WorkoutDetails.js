import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { Link } from "react-router-dom";

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        });

        const json = await response.json(); //document we have just deleted from db

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
            //dispatching this action that gets handled in WorkoutContext file, in reducer
        }

    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p> <strong>Load (kg): </strong> {workout.load} </p>
            <p> <strong>Reps: </strong> {workout.reps} </p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <Link id="link" to={`/api/workouts/${workout._id}`}>Edit</Link>
        </div>
    )
}

export default WorkoutDetails;