import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EvolutionBar from '../../Components/EvolutionBar'
import { AnimatePresence, motion } from 'framer-motion'


const EvolutionContainer = styled(motion.div)`
  overflow: auto;
  padding: 20px;
`

const evolutionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};


const Evolution = () => {
  const { id } = useParams();
  console.log(id, "in Evolution")
  const [evolutionChain, setEvolutionChain] = useState([])
  const [evolutionImageURLs, setEvolutionImageURLs] = useState([])
  const [isURLSet, setIsURLSet] = useState(false)
  let chain;

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {

        const chainURL = `https://pokeapi.co/api/v2/evolution-chain/${id}`
        const response = await fetch(chainURL)
        const data = await response.json()

        const evolutionDet = getEvolutionDetails(data.chain)
        console.log(evolutionDet)
        setEvolutionChain(evolutionDet);
      } catch (error) {
        console.log(error.message)
      }
    }

    const getEvolutionDetails = (chain, evolutionChain = [],) => {
      const speciesURLParts = chain.species.url.split('/');
      const speciesID = speciesURLParts[speciesURLParts.length - 2]

      // console.log(chain?.evolution_details)
      const evolution = {
        id: speciesID,
        name: chain.species.name,
        url: chain.species.url,
      }

      // if evolution_details has something, it'll have min_level too, which will tell us which level is required at min for evolution to happen.
      if (chain.evolution_details.length > 0) {
        evolution.min_level = chain.evolution_details[0].min_level;
      }

      evolutionChain.push(evolution);

      // recursive addition of evolution details to chain
      const { evolves_to } = chain;
      if (evolves_to.length > 0) {
        evolves_to.forEach(evolution => {

          getEvolutionDetails(evolution, evolutionChain);
        });
      }
      console.log(evolutionChain)
      return evolutionChain;
    }


    fetchEvolutionData()
  }, [])

  useEffect(() => {
    const currPokemonDetails = async () => {
      const imageURLs = await Promise.all(evolutionChain.map(async (evolution, index) => {
        const pokemonDetailsURL = `https://pokeapi.co/api/v2/pokemon/${evolution.id}`
        let currPokeDetails;
        try {
          const response = await fetch(pokemonDetailsURL)
          currPokeDetails = await response.json()
          const imageURL = currPokeDetails?.sprites.other.dream_world.front_default;

          if (index > 0) {
            return { imageURL, min_level: evolution.min_level }
          }

          return { imageURL };
        } catch (error) {
          console.log(error.message)
        }
      }));
      console.log(imageURLs)
      setEvolutionImageURLs(imageURLs);
    }
    currPokemonDetails()
  }, [evolutionChain])

  // useEffect(() => {
  //   const getMinLevel = async () => {
  //     const newURLs = evolutionImageURLs.map((imageURL, index) => {
  //       if(index > 0){
  //         let newImageURL = {...imageURL};
  //         newImageURL.min_level = evolutionChain[index]?.min_level
  //         return newImageURL;
  //       }
  //       return imageURL
  //     })

  //     console.log(newURLs)
  //     // setEvolutionImageURLs(newURLs)
  //   }

  //   getMinLevel()
  // },[evolutionImageURLs])

  return (
    <EvolutionContainer>
      <motion.div
        className="container flex"
        variants={evolutionVariants}
        initial="hidden"
        animate="show"
      >
        {
          evolutionImageURLs.length > 0 ?
            evolutionImageURLs.map((url, index) => {
              return index < evolutionImageURLs.length - 1
                ?
                <motion.div
                  key={evolutionImageURLs[index].imageURL}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                  }}
                >
                  <EvolutionBar
                    firstImage={evolutionImageURLs[index].imageURL}
                    secondImage={evolutionImageURLs[index + 1].imageURL}
                    minLevel={evolutionImageURLs[index + 1]?.min_level}
                  />
                </motion.div>

                : null
            })
            : <h3>Loading</h3>
        }
      </motion.div>
    </EvolutionContainer>
  )
}

export default Evolution