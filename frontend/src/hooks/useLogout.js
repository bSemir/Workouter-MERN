import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user');

        //dispatch logout function!
        dispatch({ type: 'LOGOUT' });

        //clearing the global workouts state when we log out
        //because, when other user logs in it flashes other users workouts for a second (bc our global workouts state contained some data)
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
    }
    return { logout }
}