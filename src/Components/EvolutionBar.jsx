import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Bar = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 1px solid ; */
    border-bottom: 1px solid #9a9898;
    padding: 10px;



    img {
        width: 100%;
    }
    .firstImage,
    .secondImage {
        max-height: 110px;
        max-width: 110px;
    }

    .conversion {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #6f36e1;
        font-size: 0.8rem;
    }

`



const EvolutionBar = ({ firstImage, secondImage, minLevel }) => {
    // console.log("Evolution Bar")
    // console.log(min_level)
    // console.log(firstImage)
    // console.log(secondImage)
    console.log(minLevel)
    minLevel = `level ${minLevel}`
    return (
        <Bar>
            <div >
                <img src={firstImage} className='firstImage' />
            </div>
            <div className='conversion'>
                <span>{!!minLevel && minLevel}</span>
                <AiOutlineArrowRight size={17} />
            </div>
            <div >
                <img src={secondImage} className='secondImage' />
            </div>
        </Bar>
    )
}

export default EvolutionBar