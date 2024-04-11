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
  cursor: ${({ islink }) => (islink ? "pointer" : "auto")};
  &:hover {
    width: ${({ hasBackGround, width }) =>
      `${hasBackGround ? width - 1 : width}px`};
    height: ${({ hasBackGround, height }) =>
      `${hasBackGround ? height - 1 : height}px`};
  }
`;

const StyledSVGContainer = styled.div`
  cursor: ${({ islink }) => (islink ? "pointer" : "auto")};
  border-radius: ${({ backGroundStyle }) =>
    backGroundStyle == "round" ? "50%" : "4px"};
  background-color: ${({ backGroundColor }) => backGroundColor};
  padding: ${({ hasBackGround }) => (hasBackGround ? "1px" : "0px")};
`;

const aweSome = ({ fill, icon, spin, style }) => (
  <FontAwesomeIcon icon={icon} spinPulse={spin} style={style} />
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
  islink,
  onClick,
  hasBackGround,
  backGroundStyle,
  backGroundColor,
  style,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <StyledSVGContainer
      islink={islink}
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
        islink={islink}
        onClick={islink ? onClick : null}
        hasBackGround={hasBackGround}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        {(() => {
          switch (type) {
            case "close":
              return aweSome({ icon: faClose, fill, style });
            case "refresh":
              return aweSome({ icon: faRefresh, fill, style });
            case "settings":
              return aweSome({ icon: faGear, fill, style });
            case "explode":
              return aweSome({ icon: faEnvelope, fill, style });
            case "ham":
              return aweSome({ icon: faBars, fill, style });
            case "link":
              return aweSome({ icon: faLink, fill, style });
            case "access":
              return aweSome({ icon: faCheck, fill, style });
            case "crescent":
              return aweSome({ icon: faCircleHalfStroke, fill, style });
            case "sunshine":
              return aweSome({ icon: faSun, fill, style });
            case "role":
              return aweSome({ icon: faUsersBetweenLines, fill, style });
            case "user":
              return aweSome({ icon: faUser, fill, style });
            case "dash":
              return aweSome({ icon: faGauge, fill, style });
            case "logout":
              return aweSome({ icon: faSignOut, fill, style });
            case "globe":
              return aweSome({ icon: faGlobe, fill, style });
            case "sortup":
              return aweSome({ icon: faCaretUp, fill, style });
            case "sortdown":
              return aweSome({ icon: faCaretDown, fill, style });
            case "add":
              return aweSome({ icon: faCirclePlus, fill, style });
            case "view":
              return aweSome({ icon: faEye, fill, style });
            case "delete":
              return aweSome({ icon: faCircleMinus, fill, style });
            case "print":
              return aweSome({ icon: faPrint, fill, style });
            case "angleleft":
              return aweSome({ icon: faAngleLeft, fill, style });
            case "angleright":
              return aweSome({ icon: faAngleRight, fill, style });
            case "circleplus":
                return aweSome({ icon: faCirclePlus, fill, style });              
            case "avatar":
              return custom({ icon: faSignOut, fill: "green", width, height });
            case "spinner":
              return <FontAwesomeIcon icon={faSpinner} spinPulse />;
            default:
              return null;
          }
        })()}
      </StyledSVG>
    </StyledSVGContainer>
  );
};
