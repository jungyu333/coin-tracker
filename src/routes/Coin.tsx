import { FaBitcoin } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { isShowState } from "../atoms";
import Chart from "./Chart";
import { Container, Loading } from "./Coins";
import { HomeHeaderContainer, LogoContainer, opacityAnimation } from "./Home";
import HomeButton from "./HomeButton";
import ToggleButton from "./ToggleButton";

interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
}

interface ICoinPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: Date;
      percent_from_price_ath: number;
    };
  };
}

export interface RouteParams {
  coinId: string;
}

const upAnimation = keyframes`
  from {
    transform: translateY(3vh);
    opacity:0;
  }to {
    opacity:1;
  }
`;

const MainContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 90vh;
`;

const MainHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: 6vh 5vw;
  border-bottom: 0.5px solid ${(props) => props.theme.lineColor};
  animation: ${opacityAnimation} 1.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
`;

const LastUpdate = styled.span`
  letter-spacing: 1.5px;
  line-height: 2;
`;

const CoinInfo = styled.div`
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-weight: 200;
  line-height: 1.4;
  display: flex;
  justify-content: space-between;
  span {
    border: 1px solid ${(props) => props.theme.lineColor};
    padding: 0.5vh;
    border-radius: 15px;
    margin: 0 0.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    margin-right: 10px;
  }
`;

const PercentInfo = styled.div`
  display: flex;
`;

const MainContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
  height: 30vh;
  margin-top: 15vh;
`;

const Button = styled.div`
  font-size: 1.7rem;
  border: 1px solid ${(props) => props.theme.lineColor};
  border-radius: 30px;
  padding: 3vh 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin-left: 10vw;
  animation: ${upAnimation} 1s ease-in-out;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.3);
    display: block;
    &:hover {
      color: ${(props) => props.theme.accentColor};
      transition: 1s;
    }
  }
`;

const DescripContainer = styled.div`
  display: flex:
  flex-direction: column;
  justify-content: center
  width: 50%;
  margin-left:5vw;
  animation: ${upAnimation} 1s ease-in-out;
`;

const DesTitle = styled.h1`
  font-size: 1.7rem;
  text-align: center;
  margin-bottom: 8vh;
`;

const DesContent = styled.div`
  height: 100%;
  width: 40vw;
  font-weight: 300;
  font-size: 1.4rem;
  overflow-y: auto;
  text-align: center;
`;

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const isShow = useRecoilValue(isShowState);
  const setIsShow = useSetRecoilState(isShowState);
  function onClickButton() {
    setIsShow((prev) => !prev);
  }
  const { isLoading: infoLoading, data: infoData } = useQuery<ICoinInfo>(
    ["info", coinId],
    () => {
      return fetchCoinInfo(coinId);
    }
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<ICoinPrice>(
    ["tickers", coinId],
    () => {
      return fetchCoinPrice(coinId);
    },
    { refetchInterval: 5000 }
  );
  const isLoading = infoLoading || priceLoading;

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
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <MainContainer>
          <MainHeader>
            <Title>{priceData?.name}</Title>
            <LastUpdate>Last Update: {priceData?.last_updated}</LastUpdate>
            <CoinInfo>
              <PercentInfo>
                <span>
                  <p>30m</p>
                  {priceData?.quotes.USD.percent_change_30m}%
                </span>
                <span>
                  <p>1h</p>
                  {priceData?.quotes.USD.percent_change_1h}%
                </span>
                <span>
                  <p>6h</p>
                  {priceData?.quotes.USD.percent_change_6h}%
                </span>
                <span>
                  <p>24h</p>
                  {priceData?.quotes.USD.percent_change_24h}%
                </span>
              </PercentInfo>
              <p>Price : {priceData?.quotes.USD.price?.toFixed(3)}$</p>
            </CoinInfo>
          </MainHeader>
          <MainContentContainer>
            {isShow ? (
              <Button>
                <Link onClick={onClickButton} to={`/coinlist/${coinId}`}>
                  Open chart!
                </Link>
              </Button>
            ) : (
              <Chart coinId={coinId} />
            )}
            <DescripContainer>
              <DesTitle>This Coin?</DesTitle>
              <DesContent>
                {infoData?.description === "" ? "none!" : infoData?.description}
              </DesContent>
            </DescripContainer>
          </MainContentContainer>
        </MainContainer>
      )}
    </Container>
  );
}

export default Coin;
