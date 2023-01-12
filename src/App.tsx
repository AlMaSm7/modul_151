import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './Weather';
import Pokemon from './components/Pokemon'
import LikedPokemons from "./components/LikedPokemons";
import { Typography, Grid, Hidden } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Hidden smUp>
        <Typography variant='h2'>Pokewakey</Typography>
      </Hidden>
      <Hidden smDown>
        <Typography variant='h1'>Pokewakey</Typography>
      </Hidden>
      <Grid container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Grid item xs={0} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Weather />
        </Grid>
        <Grid item xs={0} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Pokemon />
        </Grid>
        <Grid item xs={12} md={6}>
          <LikedPokemons />
        </Grid>
      </Grid>
    </div>
  )
}

export default App;
