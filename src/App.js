import logo from './logo.svg';
import './App.css';

// importing the react-router package

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Login from './Components/Auth/Login';
import Categories from './Components/Categories/Categories';
import Todos from './Components/Todos/Todos';
import NotFound from './Components/NotFound';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation/>

          <Routes>
            <Route path='/' element={<Todos/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
            <Route path='/todos' element={<Todos/>}/>
            <Route path='*' element={<NotFound/>}/>
            

          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
