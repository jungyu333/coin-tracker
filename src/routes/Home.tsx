import styled, { keyframes } from "styled-components";
import { FaBitcoin } from "react-icons/fa";
import { Link } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import HomeButton from "./HomeButton";

const Bounce = keyframes`
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #CCC,
                 0 2px 0 #CCC,
                 0 3px 0 #CCC,
                 0 4px 0 #CCC,
                 0 5px 0 #CCC,
                 0 6px 0 #CCC,
                 0 7px 0 #CCC,
                 0 8px 0 #CCC,
                 0 9px 0 #CCC,
                 0 50px 25px rgba(0, 0, 0, .2);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const HomeHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  position: relative;
`;

const HomeMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5vh;
  width: 100vw;
  height: 85vh;
  h1 {
    font-size: 3rem;
    margin-bottom: 5vh;
    animation: ${Bounce} 0.3s ease infinite alternate;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
      0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent,
      0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
  }
  a {
    text-decoration: none;
    font-size: 1.5rem;
    margin-bottom: 5vh;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: ${(props) => props.theme.accentColor};
      transition: 1s;
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.7rem;
  h1 {
    font-weight: 300;
    padding-left: 5px;
  }
`;

function Home() {
  return (
    <Container>
      <HomeHeaderContainer>
        <LogoContainer>
          <FaBitcoin />
          <h1>Coin Tracker</h1>
        </LogoContainer>
        <ToggleButton />
        <HomeButton />
      </HomeHeaderContainer>
      <HomeMainContainer>
        <h1>COIN TRACKER</h1>
        <Link to="/coinlist">click here!</Link>
      </HomeMainContainer>
    </Container>
  );
}

export default Home;
