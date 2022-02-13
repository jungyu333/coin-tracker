import { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Chart from "./Chart";
import { Container } from "./Coins";
import { HomeHeaderContainer, LogoContainer } from "./Home";

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
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.7);
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
    border: 1px solid rgba(0, 0, 0, 0.3);
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
  width: 70vw;
  height: 30vh;
  margin-top: 10vh;
`;

const Button = styled.div`
  font-size: 1.7rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  padding: 3vh 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.3);
    display: block;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const DescripContainer = styled.div`
  display: flex:
  flex-direction: column;
  width: 50%;
`;

const DesTitle = styled.h1`
  font-size: 1.7rem;
  text-align: center;
  margin-bottom: 3vh;
`;

const DesContent = styled.div`
  height: 100%;
  margin-top: 5vh;
  font-weight: 300;
  font-size: 1.4rem;
  overflow-y: auto;
  text-align: center;
`;

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [show, setShow] = useState(true);

  function onClickButton() {
    setShow(false);
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
        <div>Toggle Switch</div>
      </HomeHeaderContainer>
      {isLoading ? (
        <span>Loading...</span>
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
            {show ? (
              <Button>
                <Link onClick={onClickButton} to={`/coinlist/${coinId}`}>
                  Open chart!
                </Link>
              </Button>
            ) : (
              <Chart coinId={coinId} show={show} setShow={setShow} />
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
