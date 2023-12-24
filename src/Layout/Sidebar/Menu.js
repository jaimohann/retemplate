import { styled, useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { useLayout } from "../../Context/Layout";
import Collapsible from "./Components/Collapsible";

const StyledListContainer = styled.div`
  color: white;
  padding: 0.25rem 0 0.25rem 0;
  border-bottom: 1px solid #767d85;
  flex-grow: 1;
  overflow-y: ${({ focus }) => (focus ? "auto" : "hidden")};
  overflow-x: hidden;
  width: ${({ collapse }) => (collapse ? "5rem" : "250px")};
  transition: ${({ collapse }) =>
    collapse ? "width 0.6s ease" : "width .6s ease"};
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.secondary};
    margin: 5px 0px 5px 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.borderInverse};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.border};
  }
`;

const Menu = () => {
  const { collapse } = useLayout();
  const [items, setItems] = useState([]);
  const [focus, setFocus] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState();
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
    if (items.length == 0) fetchItems();
  }, [items]);

  const handleClick = (e, id) => {
    setSelected(id);
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
    <StyledListContainer
      collapse={collapse}
      focus={focus}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      {items.map((item) =>
        hasChildren(item.id) ? (
          expanded.includes(item.parent) || item.level == 1 ? (
            <Collapsible
              collapse={collapse}
              theme={theme}
              icon={item.icon || "link"}
              title={"" + " ".repeat(item.level) + " " + item.name}
              isLink={true}
              menuLink={true}
              height={-0.2}
              onClick={(e) => handleClick(e, item.id)}
            ></Collapsible>
          ) : null
        ) : expanded.includes(item.parent) || item.level == 1 ? (
          <Collapsible
            collapse={collapse}
            theme={theme}
            icon={item.icon || "link"}
            title={" " + "  ".repeat(item.level) + " " + item.name}
            isLink={true}
            menuLink={true}
            height={-0.2}
            menuLinkRoute={item.link}
            selected={item.id == selected ? true : false}
            onClick={(e) => handleClick(e, item.id)}
          ></Collapsible>
        ) : null
      )}
    </StyledListContainer>
  );
};

export default Menu;
