import React, { useEffect, useState } from "react";

import styled, { useTheme } from "styled-components";
import { useApp } from "../../../../../Context/Application";

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;

  border-radius: 2px;
  box-sizing: border-box;
`;

const StyledOption = styled.option`
  width: 100%;
  padding: 8px;

  border-radius: 2px;
  box-sizing: border-box;
`;

const Option = ({ type, id, placeholder, value, onBlur, onChange, source }) => {
  const { theme } = useTheme();
  const { privateRequest } = useApp();
  const [data, setData] = useState([]);
  const { endPoint, keyCol, valueCol } = source;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          redirect: "follow",
        };

        let responseData;
        if (endPoint) {
          responseData = await privateRequest(
            `/v1/${endPoint}?select=${valueCol}`,
            options
          );
        } else {
          responseData = source.data;
        }
        if (isMounted) {
          setData(responseData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [endPoint]);

  return (
    <StyledSelect onChange={onChange} id={id} value={value} onBlur={onBlur}>
      <StyledOption value="" disabled selected>
        {placeholder}
      </StyledOption>
      {data.groups &&
        data.groups.map(({ key, name, items }) => (
          <optgroup key={key} label={name}>
            {items.map((item) => (
              <StyledOption theme={theme} value={item[keyCol]}>
                {item[valueCol]}
              </StyledOption>
            ))}
          </optgroup>
        ))}
    </StyledSelect>
  );
};

export default Option;
