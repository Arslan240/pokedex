import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Progress from '../../Components/Progress'

const BaseStatsContainer = styled.div`
  display: flex;
  padding: 25px;
  gap: 35px;

  .flex-col{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .flex-row {
    display: flex;
    gap: 20px;
  }

  .stat-name {
    text-transform: capitalize;
    font-weight: 500;
    color: #9a9898;
  }

  .stats-details {
    width: 100%;
  }
  .inner-details {
    flex-grow: 0;
  }
  .progress-bars {
    margin-top: 10px;
    flex-grow: 1;
  }
  .bar {
    gap: 0;
    margin-bottom: 18px;
  }


`



const BaseStats = () => {
  const { id } = useParams();
  const [stats, setStats] = useState([])
  const [pokeStatValue, setPokeStatValue] = useState(0)
  // console.log(id, "in BaseStats")

  useEffect(() => {
    const statsURL = `https://pokeapi.co/api/v2/pokemon/${id}`
    const getPokemonStats = async () => {
      const response = await fetch(statsURL)
      const data = await response.json()
      // console.log(data)
      setStats(data.stats)
    }
    getPokemonStats()

    return () => {
      setStats([])
    }

  }, [])

  useEffect(() => {
    if (stats.length > 0) {
      const pokeValue = stats.reduce((acc, stat) => acc + stat.base_stat, 0);
      setPokeStatValue(pokeValue);
    }

    return () => {
      setPokeStatValue(0);
    }
  }, [stats]);


  // console.log(stats)
  return (
    <BaseStatsContainer>
      <div className="stats-name flex-col">
        <span className='stat-name'>HP</span>
        <span className='stat-name'>attack</span>
        <span className='stat-name'>defense</span>
        <span className='stat-name'>sp. atk</span>
        <span className='stat-name'>sp. def</span>
        <span className='stat-name'>speed</span>
        <span className='stat-name'>total</span>
      </div>
      <div className="stats-details flex-row">
        <div className="inner-details flex-col">
          {
            !!stats &&
            stats.map((stat, index) => {
              return (
                <span className="value" key={stat.stat.name}>{stat.base_stat}</span>
              )
            })
          }
          {
            !!pokeStatValue &&
            <span className="value" >{pokeStatValue}</span>
          }
        </div>
        {!!stats && (
          <div className="progress-bars flex-col">
            {stats.map((stat) => (
              <Progress
                value={stat.base_stat}
                max={100}
                key={stat.stat.name}
                name={stat.stat.name}
              />
            ))}
            {!!pokeStatValue && (
              <Progress value={pokeStatValue} max={700} name={"total"} />
            )}
          </div>
        )}
        {!stats && <h3>Loading</h3>}
      </div>
    </BaseStatsContainer>
  )
}

export default BaseStats