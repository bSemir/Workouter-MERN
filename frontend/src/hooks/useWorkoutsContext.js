import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

//use this hook to consume WorkoutsContext(this provides us with two values: state and dispatch)
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context)
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider!');

    return context;
}