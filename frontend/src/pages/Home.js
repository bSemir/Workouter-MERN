import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const [search, setSearch] = useState("");

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

    const handleSearch = async () => {
        //  console.log(search);
        const response = await fetch('/api/workouts/find/' + search, {
            method: 'GET'
        });
        const json = await response.json();
        if (response.ok)
            dispatch({ type: 'SEARCH_WORKOUTS', payload: json });

        // TODO: handle error message better  
        // if (!response.ok)
        //     console.log(json);
    }

    const handleRefresh = async () => {
        const response = await fetch('/api/workouts');
        const json = await response.json();
        if (response.ok)
            dispatch({ type: 'SET_WORKOUTS', payload: json });
    }

    return (
        <div className="home">
            <div className="workouts">
                <span id="search" className="material-symbols-outlined" onClick={handleSearch}>search</span>
                <span id="refresh" className="material-symbols-outlined" onClick={handleRefresh}>refresh</span>
                <input
                    type="text"
                    id="search_input"
                    name="search"
                    placeholder="Search by workouts title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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