import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/context';
import 'react-icons/gi'
import 'react-icons/fa'
import { GiFemale, GiMale } from 'react-icons/gi';
import { FaGenderless } from 'react-icons/fa';

const AboutContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  max-width: 400px;

  .species,
  .breeding {
    span {
      text-transform: capitalize;
    }
    .no-cap {
      text-transform: none;
    }
  }

  h2 {
    margin: 0;
    margin: 20px 0px 7px 0px;
  }

  .flex-row{
    display: flex;
    gap: 40px;
  }

  .row-species {
    gap: 68px;
  }
  
  
  .flex-col{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .headings {
    font-weight: 500;
    color: #7b7b7b;
  }
`


/**
 * height in decimeters 
 * weight in hectograms 
 * abilities: a link to an array of ability object, abilities:[ { ability: { name: "" } } ] - done
 * species: https://pokeapi.co/api/v2/evolution-chain/1/,  { chain: { species: { name:"" } } }
 * gender: https://pokeapi.co/api/v2/gender/1/ .
 * egg groups: https://pokeapi.co/api/v2/pokemon-species/1/  egg-groups: [{url: ""}], url => name
 * egg cycles- https://pokeapi.co/api/v2/pokemon-species/id/   (hatch-counter)
 */

/**
 * 
 * @returns About page which contains Species, Height, Weight, Abilities
 */
const About = () => {
  const { id } = useParams();
  const { pokemonDetails } = useGlobalContext();
  const [speciesDetails, setSpeciesDetails] = useState([])
  const [breedingDetails, setBreedingDetails] = useState([])

  const pokeDetailsURL = `https://pokeapi.co/api/v2/pokemon/${id}/`
  const speciesURL = `https://pokeapi.co/api/v2/evolution-chain/${id}/`
  const genderURL = `https://pokeapi.co/api/v2/gender/${id}/`
  const eggGroupsURL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  const eggCyclesURL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  
  
  useEffect(() => {
    
    async function fetchData(){
      const {height, weight, abilities} = await fetchHeightAndWeight()
      const speciesName = await fetchSpecies()
      
      const genderName = await fetchPokemonGender()
      // const responseGender = await fetch(genderURL)
      // const {name: genderName} = await responseGender.json()
      
      const {eggGroups, hatch_counter} = await fetchEggGroupsAndEggCycle()
      
      setSpeciesDetails([{speciesName},{height}, {weight},  {abilities}])
      setBreedingDetails([{genderName}, {eggGroups}, {hatch_counter}])
    }

    async function fetchHeightAndWeight(){
      try {
        const responsePokeDetails = await fetch(pokeDetailsURL)
        let { abilities = [], height, weight } = await responsePokeDetails.json()
        const abts = abilities.map(({ ability }) => ability.name)
        height = height / 10; // decimeter to meter conversion.
        weight = weight / 10; // hectogram to kilogram conversion.
        return {height, weight, abilities: abts.join(', ')}
      } catch (error) {
        console.log("Error in height, weight or abilities")
        console.log(error.message)
      }
    }

    async function fetchSpecies(){
      try {
        const responseSpecies = await fetch(speciesURL)
        const speciesData = await responseSpecies.json()
        const {name: speciesName} = speciesData.chain.species
        return speciesName
      } catch (error) {
        console.log("Error in fetching species name")
        console.log(error.message)
      }
    }

    async function fetchPokemonGender(){
      try {
        const response = await fetch(eggGroupsURL);
        const data = await response.json();
        const genderRate = data.gender_rate;
        const gender = determineGender(data);
        return gender
        console.log(`Gender ratio: ${genderRate}, Gender: ${gender}`);
      } catch (error) {
        console.error(error);
      }
    }

    function determineGender(pokemonSpecies){
      const physicalAttackIV = Math.floor(Math.random() * 16);
      const genderRate = pokemonSpecies.gender_rate;

      if (genderRate === -1) {
        return 'Gender unknown';
      }
    
      if (genderRate === 0) {
        return 'Always male';
      }
    
      if (genderRate === 8) {
        return 'Always female';
      }

      const femaleThreshold = genderRate * 0.125 * 15;
      if (physicalAttackIV <= femaleThreshold) {
        return 'Female';
      } else {
        return 'Male';
      }
    
    }

    async function fetchEggGroupsAndEggCycle(){
      try {
        const responseEggGroup = await fetch(eggGroupsURL)
        const {egg_groups: eggGroupDetails, hatch_counter} = await responseEggGroup.json()
        const eggGroups = eggGroupDetails?.map(detail => {
          return detail.name;
        });
        return {eggGroups: eggGroups.join(', '), hatch_counter}  
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  },[id])
  
  console.log(speciesDetails)
  console.log(breedingDetails)
  console.log(id, "in About")
  return (
    <AboutContainer>
      <div className="species">
        <div className="flex-row row-species">
          <div className="flex-col headings">
            <span>species</span>
            <span>height</span>
            <span>weight</span>
            <span>abilities</span>
          </div>
          <div className="flex-col">
          {speciesDetails.length > 0 &&
              speciesDetails.map((detail) => {
                const [key, value] = Object.entries(detail)

                console.log(key[0], key[1])
                
                if(key[0] === 'height'){
                  return <span className='no-cap'>{key[1]} m</span> 
                }
                else if(key[0] === 'weight'){
                  return <span className='no-cap'>{key[1]} kg</span>
                }
                else{
                  return <span>{key[1]}</span>
                }
              })
            }
          </div>
        </div>
      </div>
      <div className="breeding">
        <h2>Breeding</h2>
        <div className="flex-row row-breeding">
          <div className="flex-col headings">
            <span> gender</span>
            <span>egg groups</span>
            <span>egg cycle</span>
          </div>
          <div className="flex-col">
          {breedingDetails.length > 0 &&
              breedingDetails.map((detail) => {
                const [key, value] = Object.entries(detail)
                console.log(key[0], key[1])

                if(key[0] === 'genderName'){
                  console.log("Ddd")
                  const regexMale = /\bmale\b/
                  const regexFemale = /\bfemale\b/
                  if(key[1].toLowerCase().match(regexMale)){
                    console.log(key[1])
                    return <span>{<GiMale color='#223eda'/>} {key[1]}</span>
                  }
                  else if(key[1].toLowerCase().match(regexFemale)){
                    console.log(key[1])
                    return <span><GiFemale color='#de3434'/> {key[1]}</span>
                  }
                  else {
                    return <span><FaGenderless color='#ffd437'/> {key[1]}</span>
                  }
                }

                return ( <span>{key[1]}</span> )
              })
            }
          </div>
        </div>
      </div>
    </AboutContainer>
  )
}

export default About