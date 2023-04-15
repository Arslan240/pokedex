import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../Context/context'
import styled from 'styled-components'

const PokemonListContainer = styled.div`
  padding: 0 40px;
  max-width: 701px;
  margin: 0 auto;
`

const Pokemons = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  @media screen and (max-width:700px){
    justify-content: center;
  }
`

const Pokemon = styled.div`
  display: flex;
  max-width: 250px;
  min-height: 160px;
  flex-basis: 250px;
  overflow: hidden;
  position: relative;
  background-color: #7CBEB3;
  color: white;
  padding: 20px;
  gap: 10px;
  border-radius: 15px;
  h2 {
    margin-top: 8px;
  }
  & img {
    width: 100%;
  }
  & .image {
    width: 120px;
    
    
  }
  & .image-background {
    width: 190px;
    height: 190px;
    background: #55a396;
    border-radius: 50%;
    position: absolute;
    top:27%;
    left: 45%;
  }
 & .inner-background{
  /* background-color: lavender; */
  position: relative;
  top:6%;
  left: 10%;
 } 
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: blanchedalmond;
  font-size: 1.2rem;
  border-radius: 7px;
  margin: 20px 20px 0 0;
`

const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon/?limit=10"
const PokemonList = () => {

  const { pokemons, pokemonDetails, setPokemons, setPokemonDetails } = useGlobalContext()
  const [next, setNext] = useState()
  const [prev, setPrev] = useState()
  const nextUrlRef = useRef(null)
  const prevUrlRef = useRef(null)

  useEffect(() => {
    let url = pokemonListUrl
    if(next === nextUrlRef.current){
      url = next;
    }else if(prev === prevUrlRef.current){
      url = prev;
    }
    console.log(url);
    if(!url){
      return;
    }
    const getPokemon = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        const { results, next, previous } = data;
        // console.log(data)
        nextUrlRef.current = next;
        prevUrlRef.current = previous;
        getpokemonDetails(results)
        setPokemons(results);
      } catch (error) {
        console.log(error.message)
      }
    }

    const getpokemonDetails = async (results) => {
      try {
        const promisesArray = results?.map(async result => {
          const response = await fetch(result.url)
          const data = response.json()
          return data;
        })
        const mappedResults = await Promise.all(promisesArray)
        // console.log(mappedResults)

        setPokemonDetails(mappedResults)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPokemon()
  }, [next, prev])

  const handleNext = () => {
    setNext(nextUrlRef.current)
    console.log(nextUrlRef.current)
  }

  const handlePrev = () => {
    console.log(prevUrlRef.current)
    setPrev(prevUrlRef.current)
  }

  return (
    <PokemonListContainer>
      <h1>Pokemons</h1>
      <Pokemons>
        {pokemons?.map((pokemon) => (
          <Pokemon>
            <div className='details'>
              <h2>{pokemon.name}</h2>
            </div>
            <div className='image-background'>
              <div className='inner-background'>
                <div className="image">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" />
                </div>
              </div>
            </div>
          </Pokemon>
        ))}


      </Pokemons>
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </PokemonListContainer>
  )
}

export default PokemonList