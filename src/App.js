import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokedexLandingPage from "./pages/PokedexLandingPage";
import PokemonInfoPage from "./pages/PokemonInfoPage";


export default function App() {

  useEffect(() => {
    document.title = 'Pokédex';
    return () => {
      document.title = 'Pokédex';
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokedexLandingPage />} />
        <Route path="/pokemon/:name" element={<PokemonInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}