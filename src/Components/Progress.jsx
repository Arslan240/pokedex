import { useEffect, useState } from "react";
import styled from "styled-components";



const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => (props.percentage ? props.percentage : 0)}%;
  background-color: ${(props) => (props.color ? props.color : "#007bff")};
  border-radius: inherit;
  transition: width 0.5s ease-in-out;
`;

function Progress({ value, max,color }) {
  const [animPercentage, setAnimPercentage] = useState()

  // this ables the animation to be visible otherwise, animation happens even before user can even see it.
  useEffect(() => {
    setAnimPercentage((value / max) * 100)
  })
  console.log(animPercentage)
  return (
    <ProgressBarContainer className="bar">
      <ProgressBar percentage={animPercentage} color={color} />
    </ProgressBarContainer>
  );
}

export default Progress;

// const Progress = styled.progress`
//     width: 100%;
//     height: 50px;
//     border-radius: 50%;
//     background-color: #f3f3f3;
//     box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
// `

// function ProgressBar({ value, max }) {
//   return (
//     <Progress
//       value={value}
//       max={max}
//     />
//   );
// }

// export default ProgressBar
