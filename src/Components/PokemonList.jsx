import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import { Canvg } from 'canvg'


const PokemonListContainer = styled.div`
  padding:  40px;
  /* padding-bottom: 40px; */
  max-width: 701px;
  margin: 0 auto;
`

const Pokemons = styled.div`
  display: flex;
  justify-content: center;
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
  .pokemon-link {
    text-decoration: none;
    color: inherit;
  }
  .pokemon-link:active,
  .pokemon-link:hover,
  .pokemon-link:focus
  {
    color: white;
  }
  h2 {
    margin-top: 8px;
  }
  & img {
    /* width: 100%; */
    height: 120px;
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
  position: relative;
  height: 150px;
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


// const pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';

// const PokemonList = () => {
//   const { pokemons, pokemonDetails, setPokemons, setPokemonDetails } = useGlobalContext();
//   const [next, setNext] = useState(null);
//   const [prev, setPrev] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let url = pokemonListUrl;
//     if (next) {
//       url = next;
//     } else if (prev) {
//       url = prev;
//     }

//     if (!url) {
//       return;
//     }

//     const fetchData = async () => {
//       setIsLoading(true);

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const { results, next, previous } = data;

//         const pokemonDetailsPromises = results.map(async (result) => {
//           const response = await fetch(result.url);
//           const data = await response.json();
//           return data;
//         });

//         const pokemonDetailsData = await Promise.all(pokemonDetailsPromises);

//         setPokemons(results);
//         setPokemonDetails(pokemonDetailsData);
//         setNext(next);
//         setPrev(previous);
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [next, prev, setPokemons, setPokemonDetails]);

//   const handleNext = () => {
//     setPokemons([]);
//     setPokemonDetails([]);
//     setNext(next);
//   };

//   const handlePrev = () => {
//     setPokemons([]);
//     setPokemonDetails([]);
//     setPrev(prev);
//   };

//   return (
//     <PokemonListContainer>
//       <h1>Pokemons</h1>

//       <Pokemons>
//         {isLoading ? (
//           <h3>Loading</h3>
//         ) : (
//           pokemons.map((pokemon, index) => {
//             const currPokeDetails = pokemonDetails[index];
//             const imageURL = currPokeDetails?.sprites?.other?.dream_world?.front_default;

//             return (
//               <Pokemon key={currPokeDetails.id}>
//                 <Link to={`/pokemon/${currPokeDetails.id}`} state={{ imageURL }} className="pokemon-link">
//                   <div className="details">
//                     <h2>{pokemon.name}</h2>
//                   </div>

//                   <div className="image-background">
//                     <div className="inner-background">
//                       <div className="image">
//                         <img src={imageURL} alt={pokemon.name} />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </Pokemon>
//             );
//           })
//         )}
//       </Pokemons>

//       <Button onClick={handlePrev}>Prev</Button>
//       <Button onClick={handleNext}>Next</Button>
//     </PokemonListContainer>
//   );
// };

// export default PokemonList;


const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
const PokemonList = () => {

  const { pokemons, pokemonDetails, setPokemons, setPokemonDetails } = useGlobalContext()
  const [next, setNext] = useState()
  const [prev, setPrev] = useState()
  const [dominantColor, setDominantColor] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const nextUrlRef = useRef(null)
  const prevUrlRef = useRef(null)

  useEffect(() => {
    let url = pokemonListUrl
    if (next === nextUrlRef.current) {
      url = next;
    } else if (prev === prevUrlRef.current) {
      url = prev;
    }
    console.log(url);
    if (!url) {
      return;
    }
    const getPokemon = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        const { results, next, previous } = data;
        
        console.log(nextUrlRef.current)
        console.log(prevUrlRef.current)

        nextUrlRef.current = next;
        prevUrlRef.current = previous;

        console.log(next)
        console.log(previous)
        console.log(nextUrlRef.current)
        console.log(prevUrlRef.current)
        console.log("LALALA")
        
        getpokemonDetails(results)
        setPokemons(results);
      } catch (error) {
        console.log(error.message)
      }
      finally{
        setIsLoading(false)
      }
    }

    const getpokemonDetails = async (results) => {
      try {
        const promisesArray = results?.map(async result => {
          const response = await fetch(result.url)
          const data = response.json()
          // console.log(data)
          return data;
        })
        const mappedResults = await Promise.all(promisesArray)
        console.log(mappedResults)

        setPokemonDetails(mappedResults)
      } catch (error) {
        console.log(error.message)
      }
    }

    getPokemon()
  }, [next, prev])


  const handleNext = () => {
    // setIsLoading(true)
    setPokemons([])
    setPokemonDetails([])
    setNext(nextUrlRef.current)
    // console.log(nextUrlRef.current)
  }
  
  const handlePrev = () => {
    // console.log(pokemons)
    
    // console.log(prevUrlRef.current)
    setPokemons([])
    setPokemonDetails([])
    // setIsLoading(true)
    setPrev(prevUrlRef.current)
    
  }

  console.log(pokemonDetails)

  return (
    <PokemonListContainer>
      <h1>Pokemons</h1>
      <Pokemons>
        { isLoading ?
          <h3>Loading</h3>
        : !!(pokemons.length > 0) && !!(pokemonDetails.length > 0) &&
          pokemons.map((pokemon) => {
          const currPokeDetails = pokemonDetails.find((details) => pokemon.name === details.name)
          console.log(pokemonDetails)
          // console.log(currPokeDetails);
          // const { id } = currPokeDetails;

          const imageURL = currPokeDetails?.sprites.other.dream_world.front_default;
          // console.log(imageURL)

          // to pass props to Link component we need to pass an object to 'to' prop with pathname and state property. Then state is accessible in the respective component using useLocation().
          return (
            <Pokemon key={currPokeDetails.id}>
              {
                <Link 
                  to={`/pokemon/${currPokeDetails.id}`}
                  state={{imageURL}}
                  className='pokemon-link' 
                >
                  {/* {console.log(typeof imageURL)} */}
                  <div className='details'>
                    <h2>{pokemon.name}</h2>
                  </div>
                  <div className='image-background'>
                    <div className='inner-background'>
                      <div className="image">
                        <img src={imageURL} alt={pokemon.name}/>
                      </div>
                    </div>
                  </div>
                </Link>
              }
            </Pokemon>
          )
        })}


      </Pokemons>
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </PokemonListContainer>
  )
}

export default PokemonList