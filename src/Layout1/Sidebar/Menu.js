import { styled, useTheme } from "styled-components";

import { Icon } from "../../assets/Icon";
import { useEffect, useState } from "react";
import { useLayout } from "../../Context/Layout";

const StyledParent = styled.ul`
  padding-left: ${({ level }) => level * 10 + "px"};
  margin: 0px;
  list-style-type: none;
  opacity: ${({ collapse }) => (collapse ? 0 : 1)};
  transition: ${({ collapse }) =>
    collapse ? "opacity 0.1s ease" : "opacity 2.0s ease"};
  font-weight: 400;
  cursor: pointer;
`;

const StyledChildren = styled.li`
  padding-left: ${({ level }) => level * 10 + "px"};
  margin: 0px;
  list-style-type: none;
  opacity: ${({ collapse }) => (collapse ? 0 : 1)};
  transition: ${({ collapse }) =>
    collapse ? "opacity 0.1s ease" : "opacity 2.0s ease"};
  cursor: pointer;
`;

const StyledItemContainer = styled.div`
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  background-image: ${({ theme }) => "linear-gradient(to bottom," + theme.color.primary + "," + theme.color.secondary + ")" };
  
  &:hover {
    background-image: linear-gradient(to bottom, #343a40, #9090bdd6);
  }
`;

const StyledItemHolder = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  cursor: pointer;
`;

const StyledListContainer = styled.div`
  color: white;

  border-bottom: 1px solid #767d85;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #343a40;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const Menu = () => {
  const { collapse } = useLayout();
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const { theme } = useTheme();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("./items.json"); // Update the path to your JSON file
        const data = await response.json();
        setItems(data.items);
        setExpanded(
          data.items.filter((item) => item.level == 1).map((itm) => itm.id)
        );
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleClick = (e, id) => {
    setExpanded((prev) => {
      // Use spread syntax to create a new array
      const newExpanded = prev.includes(id)
        ? [...prev.filter((prevId) => prevId !== id)] // Remove the id if it exists
        : [...prev, id]; // Add the id if it doesn't exist

      return newExpanded;
    });
  };

  const hasChildren = (id) => items.some((itm) => itm.parent == id);

  return (
    <StyledListContainer>
      {items.map((item) =>
        hasChildren(item.id) ? (
          expanded.includes(item.parent) || item.level == 1 ? (
            <StyledItemContainer theme={theme}>
              <StyledItemHolder>
                <Icon
                  type={item.icon || "link"}
                  height={"40"}
                  width={"40"}
                  isLink={true}
                ></Icon>
                <StyledParent
                  level={item.level}
                  onClick={(e) => handleClick(e, item.id)}
                  collapse={collapse}
                >
                  {item.name}
                </StyledParent>
              </StyledItemHolder>
            </StyledItemContainer>
          ) : null
        ) : expanded.includes(item.parent) || item.level == 1 ? (
          <StyledItemContainer>
            <StyledItemHolder>
              <Icon
                type={item.icon || "link"}
                height={"40"}
                width={"40"}
                isLink={true}
              ></Icon>

              <StyledChildren level={item.level} collapse={collapse}>
                {item.name}{" "}
              </StyledChildren>
            </StyledItemHolder>
          </StyledItemContainer>
        ) : null
      )}
    </StyledListContainer>
  );
};

export default Menu;
