import React from 'react'
import { useParams } from 'react-router-dom';

const Evolution = () => {
  const {id} = useParams();
  console.log(id, "in Evolution")
  return (
    <div>Evolution</div>
  )
}

export default Evolution