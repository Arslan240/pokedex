import React from 'react'
import { useParams } from 'react-router-dom';

const Moves = () => {
  const {id} = useParams();
  console.log(id, "in Moves")
  return (
    <div>Moves</div>
  )
}

export default Moves