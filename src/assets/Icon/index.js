// Import necessary dependencies
import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBars,
  faGauge,
  faClose,
  faRefresh,
  faGear,
  faUsersBetweenLines,
  faUser,
  faLink,
  faCheck,
  faSun,
  faMoon,
  faCircleHalfStroke,
  faSignOut,
  faGlobe,
  faSortUp,
  faSortDown,
  faCaretUp,
  faCaretDown,
  faCirclePlus,
  faEye,
  faCircleMinus,
  faPrint,
  faAngleLeft,
  faAngleRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon1 } from "./Icon";

const StyledSVG = styled.svg`
  fill: ${({ fill }) => fill};
  padding: 0px 8px 0px 8px;
  cursor: ${({ isLink }) => (isLink ? "pointer" : "auto")};
  &:hover {
    width: ${({ hasBackGround, width }) =>
      `${hasBackGround ? width - 1 : width}px`};
    height: ${({ hasBackGround, height }) =>
      `${hasBackGround ? height - 1 : height}px`};
  }
`;

const StyledSVGContainer = styled.div`
  cursor: ${({ isLink }) => (isLink ? "pointer" : "auto")};
  border-radius: ${({ backGroundStyle }) =>
    backGroundStyle == "round" ? "50%" : "4px"};
  background-color: ${({ backGroundColor }) => backGroundColor};
  padding: ${({ hasBackGround }) => (hasBackGround ? "1px" : "0px")};
`;

const aweSome = ({ fill, icon }) => (
  <FontAwesomeIcon icon={icon} spinPulse style={{ color: fill }} />
);

const custom = ({ fill, icon }) => (
  <FontAwesomeIcon1 icon={icon} style={{ color: fill }} />
);

export const Icon = ({
  type,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  isLink,
  onClick,
  hasBackGround,
  backGroundStyle,
  backGroundColor,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <StyledSVGContainer
      isLink={isLink}
      hasBackGround={hasBackGround}
      backGroundStyle={backGroundStyle}
      backGroundColor={backGroundColor}
    >
      <StyledSVG
        width={hasBackGround && focus ? width - 1 : width}
        height={hasBackGround && focus ? height - 1 : height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        isLink={isLink}
        onClick={isLink ? onClick : null}
        hasBackGround={hasBackGround}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        {(() => {
          switch (type) {
            case "close":
              return aweSome({ icon: faClose, fill });
            case "refresh":
              return aweSome({ icon: faRefresh, fill });
            case "settings":
              return aweSome({ icon: faGear, fill });
            case "explode":
              return aweSome({ icon: faEnvelope, fill });
            case "ham":
              return aweSome({ icon: faBars, fill });
            case "link":
              return aweSome({ icon: faLink, fill });
            case "access":
              return aweSome({ icon: faCheck, fill });
            case "crescent":
              return aweSome({ icon: faCircleHalfStroke, fill });
            case "sunshine":
              return aweSome({ icon: faSun, fill });
            case "role":
              return aweSome({ icon: faUsersBetweenLines, fill });
            case "user":
              return aweSome({ icon: faUser, fill });
            case "dash":
              return aweSome({ icon: faGauge, fill });
            case "logout":
              return aweSome({ icon: faSignOut, fill });
            case "globe":
              return aweSome({ icon: faGlobe, fill });
            case "sortup":
              return aweSome({ icon: faCaretUp, fill });
            case "sortdown":
              return aweSome({ icon: faCaretDown, fill });
            case "add":
              return aweSome({ icon: faCirclePlus, fill });
            case "view":
              return aweSome({ icon: faEye, fill });
            case "delete":
              return aweSome({ icon: faCircleMinus, fill });
            case "print":
              return aweSome({ icon: faPrint, fill });
            case "angleleft":
              return aweSome({ icon: faAngleLeft, fill });
            case "angleright":
              return aweSome({ icon: faAngleRight, fill });
            case "avatar":
              return custom({ icon: faSignOut, fill: "green", width, height });
            case "spinner":
              return aweSome({ icon: faSpinner, width, height });
            default:
              return null;
          }
        })()}
      </StyledSVG>
    </StyledSVGContainer>
  );
};
