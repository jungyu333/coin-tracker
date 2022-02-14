import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

const ToggleBtn = styled.input`
  display: none;
`;

const ToggleLabel = styled.label`
  position: relative;
  height: 26px;
  width: 50px;
  border-radius: 50px;
  border: 1px solid black;
  .on {
    transform: translateX(21.5px);
    transition: 1s;
  }
  .off {
    transform: translateX(-1px);
    transition: 1s;
  }
`;

const Ball = styled.div`
  position: absolute;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  top: 1.5px;
  left: 1.5px;

  background-color: ${(props) => props.theme.textColor};
`;

function ToggleButton() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  function onToggle() {
    setIsDark((prev) => !prev);
  }
  return (
    <>
      <ToggleBtn
        type="checkbox"
        checked={isDark}
        onChange={onToggle}
        id="switchInput"
      />
      <ToggleLabel htmlFor="switchInput">
        <Ball className={isDark ? "on" : "off"}></Ball>
      </ToggleLabel>
    </>
  );
}

export default ToggleButton;
