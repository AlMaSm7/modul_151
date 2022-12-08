import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './Weather'
import {Grid} from "@mui/material"

function App() {
  return (
    
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={3}>
          <Weather/>
      </Grid>      
    </Grid>
  );
}

export default App;
