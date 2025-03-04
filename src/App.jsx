import './App.css'
import { Routes, Route } from "react-router-dom";
import React from 'react'
import ParticlesComponent from './components/Particule'
import Home from './views/Home'
import ModeJeu from './views/Mode_jeu';
import DrapeauJeu from './views/DrapeauJeu';

function App() {
  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" className="absolute inset-0 -z-10" />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/solo" element={<ModeJeu />}/>
        <Route path="/mode/drapeau" element={<DrapeauJeu />} />
      </Routes>
    </div>
  )
}

export default App
