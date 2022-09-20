import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages && components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import WorkoutEdit from "./components/WorkoutEdit"
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      {/* everything to do with routes needs to be inside this - BrowserRouter*/}
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route path="/api/workouts/:id"
              element={<WorkoutEdit />}>
            </Route>
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
