import ApexCharts from "react-apexcharts";
import { privateDecrypt } from "crypto";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ICoinHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  show: boolean;
  setShow: any;
}
const BackButton = styled.div`
  a {
    text-decoration: none;
    font-size: 1.4rem;
    border: 1px solid ${(props) => props.theme.lineColor};
    border-radius: 20px;
    padding: 1vh;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  margin-bottom: 2vh;
`;

const ChartContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10vw;
`;

function Chart(props: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  function onClickBack() {
    props.setShow(true);
  }

  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["history", props.coinId],
    () => fetchCoinHistory(props.coinId)
  );

  return (
    <>
      {isLoading ? (
        <span>Chart Loading...</span>
      ) : (
        <ChartContainer>
          <BackButton>
            <Link onClick={onClickBack} to={`/coinlist/${props.coinId}`}>
              Close Chart!
            </Link>
          </BackButton>
          <ApexCharts
            type="candlestick"
            series={[
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_open,
                    y: [
                      price.open.toFixed(2),
                      price.high.toFixed(2),
                      price.low.toFixed(2),
                      price.close.toFixed(2),
                    ],
                  };
                }),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#D25044",
                    downward: "#1261C4",
                  },
                },
              },
              xaxis: {
                type: "datetime",
              },
            }}
          />
        </ChartContainer>
      )}
    </>
  );
}

export default Chart;
