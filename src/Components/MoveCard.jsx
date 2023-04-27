import React from 'react'
import styled from 'styled-components'

const StyledMoveCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
    padding: 20px 10px;
    border-radius: 15px;
    background-color: ${({theme, type}) => [theme.colors[type]] || 'blue'};

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
    const {name, type } = props;
    // console.log(props.theme)
    // console.log(name)
  return (
    <StyledMoveCard type={type}>
        <div className="icon">
            <img src={`/assets/icons/${type}.svg`} alt={`${name}-icon`}/>
        </div>
        <div className='details'><span>{name}</span></div>
    </StyledMoveCard>
  )
}

export default MoveCard