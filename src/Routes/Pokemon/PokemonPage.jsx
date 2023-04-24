import { useParams, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/context'
import { BiArrowBack } from 'react-icons/bi'
import PokeballSVG from '../../assets/PokeballSVG';
import { useEffect } from 'react';

const PokemonPageContainer = styled.div`
  background-color: rgb(124, 190, 179); 

  .back-button{
    margin: 0;
    .back-icon {
      padding: 10px 0px 0px 20px;
      size: 50px;
    }
  }
  
  .head-container {
    padding-top: 20px;
    color: white;
    height: 43vh;
  }

  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h1 {
      margin-top: 0;
    }
    .absolute-container {
      position: absolute;
    }

  }

  .nav-container {
    /* padding: 30px ; */
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    
    nav {
      /* background-color: red; */
      /* min-width: 500px; */
      max-width: 400px;
      margin: 0 auto;
      padding-top: 15px;
      
      ul {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        font-size: 1.1rem;
      }
      
      a{
        text-decoration: none;
        color: #7b7b7b;
        font-weight: bolder;
        padding: 15px;

      }
      a.active{
        &{
          /* background-color: #ececec; */
          border-bottom: 2px solid #3a4ca8;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          color: black;
        }
      }
      
      li {
        list-style: none;
        padding: 10px 0px;
      }
      
    }
  }
  .lower-section{
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
  
`

const ImageContainer = styled.div`
  position: relative;
  top: ${() => {
    console.log((window.innerHeight) / 5)
    return (window.innerHeight) / 9
  }
  }px;
  img {
    
    height: 200px;
  }
`

const OutletContainer = styled.div`
  /* background-color: red; */
  /* min-width: 500px; */
  max-width: 400px;
  margin: 0 auto;
`

const PokemonPage = () => {
  const { pokemons, pokemonDetails } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`about`, {replace: true})
  }, [])

  console.log("PokemonPage rendered")
  const currPokemon = pokemonDetails.find((pokemon) => pokemon.id == id) // this is better approach, before i was passing imageURL as state prop to Link component which was getting lost when navigating to inner NavLinks. So this approach is better.
  // console.log(pokemonDetails)
  const imageURL = currPokemon?.sprites.other.dream_world.front_default;
  // const imageURL = useLocation().state?.imageURL || ''

  return (
    <PokemonPageContainer>
      <div className='head-container'>
        <div className="back-button">
          <BiArrowBack className='back-icon' size={30} />
        </div>
        <div className='hero-section'>
          <h1>Pokemon {id}</h1>
          <div className="absolute-container">
            {imageURL && <ImageContainer>
              <img src={imageURL} alt='pokemon-image' />
            </ImageContainer>}
          </div>
        </div>
      </div>
      <div className='lower-section'>
        <div className='nav-container'>
          <nav>
            <ul>
              <li>
                <NavLink to={`/pokemon/${id}/about`}>About</NavLink>
              </li>
              <li>
                <NavLink to={`/pokemon/${id}/stats`}>Stats</NavLink>
              </li>
              <li>
                <NavLink to={`/pokemon/${id}/evolution`}>Evolution</NavLink>
              </li>
              <li>
                <NavLink to={`/pokemon/${id}/moves`}>Moves</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </div>
    </PokemonPageContainer>
  )
}

export default PokemonPage