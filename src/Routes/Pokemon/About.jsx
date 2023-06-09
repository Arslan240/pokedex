import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/context';
import 'react-icons/gi'
import 'react-icons/fa'
import { GiFemale, GiMale } from 'react-icons/gi';
import { FaGenderless } from 'react-icons/fa';
import { motion } from 'framer-motion'

const AboutContainer = styled(motion.div)`
  margin-top: 20px;
  padding: 10px 25px;
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
    color: #9a9898;
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
  // const { pokemonDetails } = useGlobalContext();
  const [speciesDetails, setSpeciesDetails] = useState([])
  const [breedingDetails, setBreedingDetails] = useState([])

  const pokeDetailsURL = `https://pokeapi.co/api/v2/pokemon/${id}/`
  const speciesURL = `https://pokeapi.co/api/v2/evolution-chain/${id}/`
  // const genderURL = `https://pokeapi.co/api/v2/gender/${id}/`
  const eggGroupsURL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  // const eggCyclesURL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`


  useEffect(() => {

    async function fetchData() {
      const { height, weight, abilities } = await fetchHeightAndWeight()
      const speciesName = await fetchSpecies()

      const genderName = await fetchPokemonGender()
      // const responseGender = await fetch(genderURL)
      // const {name: genderName} = await responseGender.json()

      const { eggGroups, hatch_counter } = await fetchEggGroupsAndEggCycle()

      setSpeciesDetails([{ speciesName }, { height }, { weight }, { abilities }])
      setBreedingDetails([{ genderName }, { eggGroups }, { hatch_counter }])
    }

    async function fetchHeightAndWeight() {
      try {
        const responsePokeDetails = await fetch(pokeDetailsURL)
        let { abilities = [], height, weight } = await responsePokeDetails.json()
        const abts = abilities.map(({ ability }) => ability.name)
        height = height / 10; // decimeter to meter conversion.
        weight = weight / 10; // hectogram to kilogram conversion.
        return { height, weight, abilities: abts.join(', ') }
      } catch (error) {
        console.log("Error in height, weight or abilities")
        console.log(error.message)
      }
    }

    async function fetchSpecies() {
      try {
        const responseSpecies = await fetch(speciesURL)
        const speciesData = await responseSpecies.json()
        const { name: speciesName } = speciesData.chain.species
        return speciesName
      } catch (error) {
        console.log("Error in fetching species name")
        console.log(error.message)
      }
    }

    async function fetchPokemonGender() {
      try {
        const response = await fetch(eggGroupsURL);
        const data = await response.json();
        const genderRate = data.gender_rate;
        const gender = determineGender(data);
        return gender
        // console.log(`Gender ratio: ${genderRate}, Gender: ${gender}`);
      } catch (error) {
        console.error(error);
      }
    }

    function determineGender(pokemonSpecies) {
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

    async function fetchEggGroupsAndEggCycle() {
      try {
        const responseEggGroup = await fetch(eggGroupsURL)
        const { egg_groups: eggGroupDetails, hatch_counter } = await responseEggGroup.json()
        const eggGroups = eggGroupDetails?.map(detail => {
          return detail.name;
        });
        return { eggGroups: eggGroups.join(', '), hatch_counter }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [id])

  console.log(speciesDetails)
  console.log(breedingDetails)
  console.log(id, "in About")
  return (
    <AboutContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        exit: {
          opacity: 0
        }
      }}
      transition={{
        delay: 0.2,
        // staggerChildren: 0.1
      }}
    >
      <div className="species">
        <div className="flex-row row-species">
          <div className="flex-col headings">
            <span>species</span>
            <span>height</span>
            <span>weight</span>
            <span>abilities</span>
          </div>
          <div className="flex-col">
            {speciesDetails.length > 0 ?

              speciesDetails.map((detail) => {
                const [key, value] = Object.entries(detail)[0]; // we are using [0] index here, because .entries return an array of [{key:value},{key:value}] pairs. In our case we only have one key value pair. So we just access it directly as it'll be the first entry in array. 

                if (key === "height" || key === "weight") {
                  return (
                    <span className='no-cap' key={key}>
                      {value} {key === "height" ? "m" : "kg"}
                    </span>
                  );
                }

                return (
                  <span key={key}>
                    {value}
                  </span>
                );
              })
              : <h3>Loading</h3>
            }
          </div>
        </div>
      </div>
      <div className="breeding">
        <h2>Breeding</h2>
        <div className="flex-row row-breeding">
          <div className="flex-col headings">
            <span>gender</span>
            <span>egg groups</span>
            <span>egg cycle</span>
          </div>
          <div className="flex-col">
            {breedingDetails.length > 0 ?

              breedingDetails.map((detail) => {
                const regexMale = /\bmale\b/i;
                const regexFemale = /\bfemale\b/i;
                const [key, value] = Object.entries(detail)[0];

                if (key === "genderName") {
                  const icon = value.toLowerCase().match(regexMale)
                    ? <GiMale color='#223eda' />
                    : value.toLowerCase().match(regexFemale)
                      ? <GiFemale color='#de3434' />
                      : <FaGenderless color='#ffd437' />;

                  return (
                    <span key={key}>
                      {icon} {value}
                    </span>
                  );
                }

                return (
                  <span key={key}>
                    {value}
                  </span>
                );
              })
              : <h3>Loading</h3>
            }
          </div>
        </div>
      </div>
    </AboutContainer>
  )
}

export default About