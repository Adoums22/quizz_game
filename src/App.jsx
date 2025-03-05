import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react'; // Ajout de useEffect ici
import ParticlesComponent from './components/Particule';
import Home from './views/Home';
import ModeJeu from './views/Mode_jeu';
import DrapeauJeu from './views/DrapeauJeu';
import CapitalJeu from './views/CapitalJeu';
import MapGame from './views/MapGame';

function App() {
  useEffect(() => {
    fetch("/features.json")
      .then((res) => res.json())
      .then((data) => console.log("Données chargées :", data))
      .catch((err) => console.error("Erreur chargement JSON:", err));
  }, []); // Déplacement ici

  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" className="absolute inset-0 -z-10" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solo" element={<ModeJeu />} />
        <Route path="/mode/drapeau" element={<DrapeauJeu />} />
        <Route path="/mode/capital" element={<CapitalJeu />} />
        <Route path="/mode/carte" element={<MapGame />} />
      </Routes>
    </div>
  );
}

export default App;
