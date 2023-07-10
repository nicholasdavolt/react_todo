import logo from './logo.svg';
import './App.css';

// importing the react-router package

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Login from './Login/Login';
import Categories from './Categories/Categories';
import Todos from './Todos/Todos';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>

        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/todos' element={<Todos/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
