import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import PokemonList from '../Components/PokemonList';
import { About, BaseStats, Evolution, Moves, PokemonPage } from './Pokemon';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            {/* <Routes location={location} key={location.pathname}> */}
            <Routes location={location}>
                <Route path="/" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonPage />}>
                    <Route key="about" path='about' element={<About />}></Route>
                    <Route key="stats" path='stats' element={<BaseStats />}></Route>
                    <Route key="evolution" path='evolution' element={<Evolution />}></Route>
                    <Route key="moves" path='moves' element={<Moves />}></Route>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes