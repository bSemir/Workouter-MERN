import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages && components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import WorkoutEdit from "./components/WorkoutEdit"
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      {/* everything to do with routes needs to be inside this - BrowserRouter*/}
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/api/workouts/:id"
              element={user ? <WorkoutEdit /> : <Navigate to="/login" />}>
            </Route>
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
