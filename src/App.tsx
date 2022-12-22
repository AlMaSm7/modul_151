import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pokemon from './components/Pokemon'
import LikedPokemons from "./components/LikedPokemons";
import {Typography} from "@mui/material";

function App() {
  return (
    <div className="App">
        <Typography variant='h1'>Pokewakey</Typography>
      <Pokemon/>
        <LikedPokemons/>
    </div>
  )
}

export default App;
