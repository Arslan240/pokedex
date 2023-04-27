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
    
    /* target the scrollbar specifically in webkit-based browsers */
  ::-webkit-scrollbar {
    width: 6px; /* make the scrollbar thinner */
    height: 6px; /* make the scrollbar shorter */
  }

  /* track and thumb styles for the scrollbar */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* color of the scrollbar track */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* color of the scrollbar thumb */
    border-radius: 3px; /* rounded corners for the thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* color of the scrollbar thumb on hover */
  }

    .icon {
        width: 50px;
    }
    img {
        width: 100%;
    }
    .details {
        font-size: .8rem;
        /* color: white; */
    }
`

const MoveCard = (props) => {
    console.log("MoveCard")
    const {name, type } = props;
    // console.log(props.theme)
    console.log(name)
  return (
    <StyledMoveCard type={type}>
        <div className="icon">
            <img src={`/src/assets/icons/${type}.svg`} alt={`${name}-icon`}/>
        </div>
        <div className='details'><span>{name}</span></div>
    </StyledMoveCard>
  )
}

export default MoveCard