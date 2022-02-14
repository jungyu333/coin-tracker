import { FaBitcoin } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { HomeHeaderContainer, LogoContainer } from "./Home";
import ToggleButton from "./ToggleButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  margin: 5vh auto;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
`;

const CoinList = styled.ul`
  height: 55vh;
  width: 70%;
  overflow-y: scroll;
`;

const Coin = styled.li`
  width: 100%;
  height: 8vh;
  border: 1px solid ${(props) => props.theme.lineColor};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2vh auto;
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    border: 1px solid ${(props) => props.theme.lineColor};
    border-radius: 15px;
    padding: 1vh 2vh;
    margin-right: 3vh;
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 3vw;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allcoins", fetchCoins);
  return (
    <Container>
      <HomeHeaderContainer>
        <LogoContainer>
          <FaBitcoin />
          <h1>Coin Tracker</h1>
        </LogoContainer>
        <ToggleButton />
      </HomeHeaderContainer>
      <Header>
        <Title>Coin List</Title>
      </Header>
      {isLoading ? (
        <span>"Loading..."</span>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <TextBox>
                <img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
              </TextBox>

              <Link
                to={{
                  pathname: `/coinlist/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                Go!
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
