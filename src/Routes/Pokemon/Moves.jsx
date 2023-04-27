import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MoveCard from '../../Components/MoveCard';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

const StyledMovesContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 25px;
  flex-wrap: wrap;

  height: 55vh;
  overflow: scroll;
`

const Moves = () => {
  const theme = {
    colors: {
      bug: '#92BC2C',
      dark: '#595761',
      dragon: '#0C69C8',
      electric: '#F2D94E',
      fairy: '#EE90E6',
      fighting: '#D3425F',
      fire: '#FBA54C',
      flying: '#A1BBEC',
      ghost: '#5F6DBC',
      grass: '#5FBD58',
      ground: '#DA7C4D',
      ice: '#75D0C1',
      normal: '#A0A29F',
      poison: '#B763CF',
      psychic: '#FA8581',
      rock: '#C9BB8A',
      steel: '#5695A3',
      water: '#539DDF'
    }
  }
  const { id } = useParams();
  const [moves, setMoves] = useState([])

  console.log(id, "in Moves")

  useEffect(() => {
    const getMovesForPokemon = async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/1`)
      const data = await response.json()
      
      // names of moves
      const moveNames = data.moves.map(move => move.move.name)

      const moveTypes = await Promise.all(moveNames.map(async (moveName) => {
        const moveResponse = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`)
        const moveData = await moveResponse.json()
        return moveData.type.name;
      }))

      const moves = moveNames.map((moveName, index) => ({name:moveName, type:moveTypes[index]}))
      return moves;
    }

    const fetchMoves = async () => {
      try {
        const moves = await getMovesForPokemon(1)
        setMoves(moves)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchMoves()

  }, [])

  console.log(moves)
  return (
    <ThemeProvider
      theme={theme}
    >
      <StyledMovesContainer>
          {
            !!(moves.length > 0) &&
            moves.map(move => (
            <MoveCard key={move.name} type={move.type} name={move.name}/>
          ))}
      </StyledMovesContainer>
    </ThemeProvider>
  )
}

export default Moves