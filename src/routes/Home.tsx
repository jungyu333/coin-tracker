import styled from "styled-components";
import { FaBitcoin } from "react-icons/fa";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const HomeHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  background-color: white;
  border-bottom: 1px solid black;
  border-bottom-left-radius: 10px;
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
    font-size: 2.5rem;
    margin-bottom: 15%;
    border: 0.5px solid black;
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
      color: purple;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.7rem;
  color: black;
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
        <div>Toggle Switch</div>
      </HomeHeaderContainer>
      <HomeMainContainer>
        <h1>COIN TRACKER</h1>
        <a href="/coinlist">click here!</a>
      </HomeMainContainer>
    </Container>
  );
}

export default Home;
