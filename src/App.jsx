import { useState } from 'react'
import { About, BaseStats, Evolution, Moves, PokemonPage } from './Routes/Pokemon/'
import PokemonList from './Components/PokemonList'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import './App.css'

function App() {
  // const {id} = useParams()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonPage />}>
          <Route path='about' element={<About />}></Route>
          <Route path='stats' element={<BaseStats />}></Route>
          <Route path='evolution' element={<Evolution />}></Route>
          <Route path='moves' element={<Moves />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Pokemon/>
    // </div>
  )
}

export default App
