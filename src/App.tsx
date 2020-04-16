import React from 'react';
import PokemonSearch from './components/PokemonSearch'
import './App.css';

function App() {
  return (
    <div className="App">
      <PokemonSearch name={"john doe"} numberOfPokemons={5}/>
    </div>
  );
}

export default App;
