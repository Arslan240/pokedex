import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from 'framer-motion'

const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${(props) => (props.percentage ? props.percentage : 0)}%;
  }
`;

const ProgressBarContainer = styled(motion.div)`
  width: 100%;
  height: 5px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  width: ${(props) => (props.percentage ? props.percentage : 0)}%;
  background-color: ${({ theme, name }) => (theme.colors[name] || "#007bff")};
  border-radius: inherit;
  animation: ${progressAnimation} 0.5s ease-in-out;
`;

function Progress({ value, max, name }) {
  const [animPercentage, setAnimPercentage] = useState(0);

  useEffect(() => {
    setAnimPercentage((value / max) * 100);
  }, [value, max, name]);

  return (
    <ProgressBarContainer
      className="bar"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          x: 100
        },
        animate: {
          opacity: 1,
          x: 0
        },
        exit: {
          opacity: 0
        }
      }}
    >
      <ProgressBar percentage={animPercentage} name={name} />
    </ProgressBarContainer>
  );
}

export default Progress;


/**
 * THIS ONE WAS NOT WORKING NOT PROPERLY
 */
// import { useEffect, useState } from "react";
// import styled from "styled-components";


// const ProgressBarContainer = styled.div`
//   width: 100%;
//   height: 5px;
//   background-color: #ddd;
//   border-radius: 10px;
//   overflow: hidden;
// `;

// const ProgressBar = styled.div`
//   height: 100%;
//   width: ${(props) => (props.percentage ? props.percentage : 0)}%;
//   background-color: ${(props) => (props.color ? props.color : "#007bff")};
//   border-radius: inherit;
// `;

// function Progress({ value, max,color }) {
//   const [animPercentage, setAnimPercentage] = useState(0)

//   useEffect(() => {
//     setAnimPercentage((value / max) * 100)

//     // add transition code inside useEffect hook
//     const progressBars = document.querySelectorAll('.bar .progress')
//     progressBars.forEach(bar => {
//       bar.style.transition = 'width 0.5s ease-in-out'
//     })

//     return () => {
//       setAnimPercentage(0)
//     }
//   }, [value, max, color])
//   console.log(animPercentage)

//   return (
//     <ProgressBarContainer className="bar">
//       <ProgressBar percentage={animPercentage} color={color} className="progress" />
//     </ProgressBarContainer>
//   );
// }

// export default Progress;