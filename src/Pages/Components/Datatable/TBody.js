import React from "react";
import { useDataTable } from "./DTContext";
import Td from "./Td";
import Tr from "./Tr";
import { Icon } from "../../../assets/Icon";
import { useTheme } from "styled-components";
import { Link } from "react-router-dom";
import { useEntity } from "../Entity";

const TBody = () => {
  const {
    serialNo,
    actions,
    columns,
    busy,
    paginatedData,
    currentPage,
    itemsPerPage,
    handleDelete,
    handleView,
  } = useDataTable();
  const { theme } = useTheme();

  return (
    <tbody>
      {!busy
        ? paginatedData[currentPage] &&
          paginatedData[currentPage].map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {serialNo.required && (
                <Td
                  key={serialNo.name}
                  colWidth={serialNo.width}
                  align={serialNo.align}
                >
                  {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                </Td>
              )}
              {Object.entries(item)
                .filter(([key, _]) =>
                  columns.map((itm) => itm.name).includes(key)
                )
                .map(([key, value], colIndex) => (
                  <Td
                    key={colIndex}
                    hidden={
                      columns.find((col) => col.name == key)
                        ? columns.find((col) => col.name == key).hidden
                        : true
                    }
                    colWidth={
                      columns.find((col) => col.name == key)
                        ? columns.find((col) => col.name == key).width
                        : "25%"
                    }
                  >
                    {value}
                  </Td>
                ))}
              {actions.required && (
                <Td key={"actions"} colWidth={actions.width}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "0px",
                    }}
                  >
                    {/* <Link
                      to={"edit"}
                      style={{ textDecoration: "none", color: "inherit" }}
                    > */}
                      <Icon
                        type={"view"}
                        width={25}
                        height={25}
                        hasBackGround={true}
                        backGroundColor={theme}
                        islink
                        style={{ margin: "0px 3px 0px 3px" }}
                        onClick={() => handleView(item["id"])}
                      ></Icon>
                    {/* </Link> */}

                    <Icon
                      type={"delete"}
                      width={25}
                      height={25}
                      hasBackGround={true}
                      backGroundColor={"red"}
                      islink
                      style={{ margin: "0px 3px 0px 3px" }}
                      onClick={() => handleDelete(item["id"])}
                    ></Icon>
                    <Icon
                      type={"print"}
                      width={25}
                      height={25}
                      hasBackGround={true}
                      backGroundColor={"green"}
                      style={{ margin: "0px 3px 0px 3px" }}
                    ></Icon>
                  </div>
                </Td>
              )}
            </Tr>
          ))
        : null}
    </tbody>
  );
};

export default TBody;
