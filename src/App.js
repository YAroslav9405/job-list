import React,{useState} from 'react';
import './App.scss';
import './scss/main.scss'
import { Routes,Route } from 'react-router';
import Home from './pages/home/Home';





function App() {
  return (
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
  );
}

export default App;
