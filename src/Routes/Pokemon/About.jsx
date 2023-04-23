import React from 'react'
import { useParams } from 'react-router-dom'

const About = () => {
  const {id} = useParams();
  console.log(id, "in About")
  return (
    <div>About</div>
  )
}

export default About