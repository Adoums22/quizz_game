import './App.css'
import { Routes, Route } from "react-router-dom";
import React from 'react'
import ParticlesComponent from './components/Particule'
import Home from './components/Home/Home'

function App() {

  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" className="absolute inset-0 -z-10" />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
