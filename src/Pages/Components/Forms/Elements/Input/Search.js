import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useApp } from "../../../../../Context/Application";

const StyledContainer = styled.div`
  position: relative; /* Add this style to make ul relative to this container */
`;

const StyledUL = styled.ul`
  z-index: 999;
  position: absolute; /* Remove this line */
  border-radius: 0px 0px 4px 4px;
  background-color: aquamarine;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const StyledSearch = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ open }) => (open == true ? "4px 4px 0px 0px" : "4px")};
  box-sizing: border-box;
`;

const StyledLI = styled.li`
  border-radius: 0px 0px 4px 4px;

  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &:hover {
    /* Add your hover styles here */
    background-color: #e0e0e0; /* Example background color on hover */
    cursor: pointer; /* Change cursor on hover */
  }
`;

const Search = ({ type, id, placeholder, value, onBlur, onChange, source }) => {
  const { theme } = useTheme();
  const { privateRequest } = useApp();
  const [data, setData] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [item, setItem] = useState("");
  const { endPoint, keyCol, valueCol } = source;

  const wrapperRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value != "") fetchData(e.target.value);
    else setListOpen(false);
  };

  const handelChange = ({ id, value, text }) => {
    setSearch(text);
    setItem(value);
    onChange({ target: { id, value } });
    setListOpen(false);
  };

  const fetchData = async (searchStr, val) => {
    try {
      const options = {
        method: "GET",
        redirect: "follow",
      };

      let responseData;
      if (endPoint) {
        if (val) {
          responseData = await privateRequest(
            `/v1/${"menus"}/${
              val
            }?select=${valueCol}`,
            options
          );
        } else {
          responseData = await privateRequest(
            `/v1/${endPoint}?${valueCol}=${
              searchStr || ""
            }&select=${valueCol}`,
            options
          );
        }
      } else {
        responseData = source.data;
      }
      setData(responseData);
      //if (responseData.length > 0)
      setListOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setItem(value);
    fetchData(null,value)
    setSearch(data[valueCol]);
  }, [value]);

  return (
    <StyledContainer>
      <div ref={wrapperRef}>
        <StyledSearch
          open={listOpen}
          //onClick={() => setListOpen(true)}
          onChange={handleSearchChange}
          value={search}
          placeholder={placeholder}
        ></StyledSearch>
        {listOpen && (
          <StyledUL>
            {data.groups &&
              data.groups.map(({ key, name, items }) =>
                items.map((item) => (
                  <StyledLI
                    theme={theme}
                    value={item[keyCol]}
                    onClick={() =>
                      handelChange({
                        id: id,
                        value: item[keyCol],
                        text: item[valueCol],
                      })
                    }
                  >
                    {item[valueCol]}
                  </StyledLI>
                ))
              )}
          </StyledUL>
        )}
      </div>
    </StyledContainer>
  );
};

export default Search;
