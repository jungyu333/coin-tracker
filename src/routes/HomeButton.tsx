import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const ButtonAnimation = keyframes`
  100% {
    transform: translateY(-10px);
    transition: 1s;
  }
`;
const HomeBtn = styled.div`
  position: absolute;
  right: 3vw;
  top: 15vh;
  a {
    font-size: 2rem;
    &:hover {
      color: ${(props) => props.theme.accentColor};
      transition: 1s;
    }
  }
  &:hover {
    animation: ${ButtonAnimation} 1s ease-in-out;
    animation-fill-mode: forwards;
  }
`;

function HomeButton() {
  return (
    <HomeBtn>
      <Link to={`/`}>
        <FaHome />
      </Link>
    </HomeBtn>
  );
}

export default HomeButton;
