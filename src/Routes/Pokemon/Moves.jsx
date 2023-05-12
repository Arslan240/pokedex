import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MoveCard from '../../Components/MoveCard';
import styled from 'styled-components';
import { motion } from 'framer-motion'


const StyledMovesContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 25px;
  flex-wrap: wrap;

  height: 50vh;
  overflow: scroll;
`

const containerVariants = {
  offscreen: {
    opacity: 0,
    scale:0.7,
  },
  onscreen: {
    opacity: 1,
    scale:1,
    transition: {
      when: "beforeChildren",
      // type: "spring",
      // bounce: 0.4,
      duration: 0.5
    }
  }
}

const Moves = () => {

  const { id } = useParams();
  const [moves, setMoves] = useState()

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

      const moves = moveNames.map((moveName, index) => ({ name: moveName, type: moveTypes[index] }))
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

    <StyledMovesContainer
      initial="offscreen"
      animate="onscreen"
    // viewport={{ once: true }}
    >

      {
        moves ?
          moves.map(move => (
            <MoveCard key={move.name} type={move.type} name={move.name} containerVariants={containerVariants} />
          ))
          : <h3>Loading</h3>
      }

    </StyledMovesContainer>

  )
}

export default Moves