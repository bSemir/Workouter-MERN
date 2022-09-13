import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload //action.payload is whatever server returned in backend(json)
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) //keep workouts in array if they're not equal
            }
        case 'PATCH_WORKOUT':
            return {
                workouts: [action.payload]
            }
        default:
            return state
    }
}

//provide our context to other components
export const WorkoutsContextProvider = ({ children }) => {
    //children is every component WorkoutContextProvider wraps, in our case it's App

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null //later, this will be whatever action.payload is
    });

    return (//instead of providing a whole object, we're spreading out different properties with ...state and providing those
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
        //now every component has access to our WorkoutsContext
        //because App component wraps every other component
    )
}