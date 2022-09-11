import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();
            //json is array of objects
            if (response.ok)
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            //dispatch updates our workouts, line 9
            //dispatch fires up workoutsReducer...
        }
        fetchWorkouts();
    }, [dispatch]) //whenever dispatch f changes, it reruns useEffect

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home