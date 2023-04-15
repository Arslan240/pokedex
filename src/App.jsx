import { useState } from 'react'
import {PokemonPage} from './Routes/Pokemon/'
import PokemonList from './Components/PokemonList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon" element={<PokemonPage />}></Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Pokemon/>
    // </div>
  )
}

export default App
