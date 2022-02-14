import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom, isShowState } from "../atoms";

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

const ChartLoading = styled.span`
  margin-top: 10vh;
  width: 100%;
  text-align: center;
`;
const ChartContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Chart(props: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsShow = useSetRecoilState(isShowState);
  function onClickBack() {
    setIsShow((prev) => !prev);
  }

  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["history", props.coinId],
    () => fetchCoinHistory(props.coinId)
  );

  return (
    <>
      {isLoading ? (
        <ChartLoading>Chart Loading...</ChartLoading>
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
