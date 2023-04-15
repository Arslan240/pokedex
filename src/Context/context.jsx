import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext);

export const AppContext = ({children}) => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState([]);
    return (
        <GlobalContext.Provider value={{pokemons, pokemonDetails,setPokemons, setPokemonDetails}}>
            {children}
        </GlobalContext.Provider>
    )
}