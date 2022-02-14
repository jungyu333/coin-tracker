import styled from "styled-components";
import { FaBitcoin } from "react-icons/fa";
import { Link } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
    font-size: 2rem;
    margin-bottom: 5vh;
    border: 2px solid ${(props) => props.theme.lineColor};
    padding: 5vh;
    border-radius: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  }
  a {
    text-decoration: none;
    font-size: 1.5rem;
    margin-bottom: 5vh;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: ${(props) => props.theme.accentColor};
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
      </HomeHeaderContainer>
      <HomeMainContainer>
        <h1>COIN TRACKER</h1>
        <Link to="/coinlist">click here!</Link>
      </HomeMainContainer>
    </Container>
  );
}

export default Home;
