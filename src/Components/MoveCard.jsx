import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const StyledMoveCard = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
    padding: 20px 10px;
    border-radius: 15px;
    background-color: ${({ theme, type }) => [theme.colors[type]] || 'blue'};

    .icon {
        width: 50px;
    }
    img {
        width: 100%;
    }
    .details {
        font-size: .8rem;
    }
`

const MoveCard = (props) => {
    // console.log("MoveCard")
    const { name, type, containerVariants } = props;
    // console.log(props.theme)
    // console.log(name)
    return (
        <StyledMoveCard
            type={type}
            variants={containerVariants}
        >
            <motion.div className="icon"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                    duration: 0.5
                 }}
            >
                <img src={`/assets/icons/${type}.svg`} alt={`${name}-icon`} />
            </motion.div>
            <div className='details'><span>{name}</span></div>
        </StyledMoveCard>
    )
}

export default MoveCard