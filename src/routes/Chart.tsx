import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { RouteParams } from "./Coin";

const BackButton = styled.div`
  color: red;
`;

const ChartContainer = styled.div``;

function Chart(props: any) {
  const { coinId } = useParams<RouteParams>();
  function onClickBack() {
    props.setShow(true);
  }

  return (
    <ChartContainer>
      <BackButton>
        <Link onClick={onClickBack} to={`/coinlist/${coinId}`}>
          Back
        </Link>
      </BackButton>
      <h1>Chart</h1>
    </ChartContainer>
  );
}

export default Chart;
