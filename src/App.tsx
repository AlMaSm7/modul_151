import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pokemon from './components/Pokemon'
import LikedPokemons from "./components/LikedPokemons";

function App() {
  return (
    <div className="App">
      <Pokemon/>
        <LikedPokemons/>
    </div>
  )
}

export default App;
