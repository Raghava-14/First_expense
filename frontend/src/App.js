import React from 'react';

import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import './styles.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<><Signup /><Link to="/">Back to Login</Link></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
