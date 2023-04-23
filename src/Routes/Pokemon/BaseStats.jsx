import React from 'react'
import { useParams } from 'react-router-dom';

const BaseStats = () => {
  const {id} = useParams();
  console.log(id, "in BaseStats")
  return (
    <div>BaseStats</div>
  )
}

export default BaseStats