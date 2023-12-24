import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Icon } from "../../../assets/Icon/index.js";
import { Link } from "react-router-dom";
import Pager from "./Pager.js";
import Th from "./Th.js";
import Tr from "./Tr.js";
import Td from "./Td.js";

// Sample data

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
`;

const ThContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
`;

const DataTable = ({ format }) => {
  const columns = format ? format.columns : [];
  const serialNo = format
    ? format.serialNo
    : { required: true, width: "40px", align: "center" };
  const itemsPerPage = format ? format.itemsPerPage : 1;
  const order = format ? format.initialSort.order : "asc";
  const name = format ? format.initialSort.name : "";
  const actions = format ? format.actions : "";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(order);
  const [data, setData] = useState({});
  const [busy, setBusy] = useState(false);
  const { theme } = useTheme();

  const sortData = () => {
    const pages = {};

    const flattenedAndSorted = []
      .concat(...Object.values(data))
      .sort((a, b) => {
        const order = sortOrder === "asc" ? 1 : -1;
        return a[sortKey] > b[sortKey] ? order : -order;
      });

    flattenedAndSorted.forEach((value, index) => {
      const key = Math.floor(index / itemsPerPage) + 1; // Calculate the key based on the index
      pages[key] = pages[key] ? [...pages[key], value] : [value];
    });

    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortData();
  const totCount = data.length;

  const columnsSrt = columns.sort((a, b) => {
    if (a.hidden === b.hidden) {
      return 0;
    }
    return a.hidden ? 1 : -1;
  });

  const columnsSrtNew = Object.values(columnsSrt).map((a) => a.name);
  const reArrangeResult = (data) =>
    data.map((obj) => {
      const filteredObj = {};
      columnsSrtNew.forEach((key) => {
        filteredObj[key] = obj[key];
      });
      return filteredObj;
    });

  const fetchItems = async (currentPage, itemsPerPage) => {
    try {
      if (!data[currentPage]) {
        setBusy(true);
        const response = await fetch(
          // `https://api.github.com/repos/octocat/Hello-World/issues?page=${currentPage}&per_page=${itemsPerPage}`,
          `https://gitlab.ilearningengines.com/api/v4/issues?access_token=sadSHeYSU97P336tx3L8&scope=all&page=${currentPage}&per_page=${itemsPerPage}`,
          {}
        ); // Update the path to your JSON file
        const res = await response.json();
        const resp = reArrangeResult(res);
        setBusy(false);
        setData((prevData) => ({ ...prevData, [currentPage]: resp }));
      }
    } catch (error) {
      setBusy(false);
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems(currentPage, itemsPerPage);
  }, [currentPage]);

  // Function to handle header cell click for sorting
  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Paginate the sorted data

  // Function to handle page change
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
    console.log(currentPage);
  };

  // const dummy = (itemsPerPage) =>
  //   []itemsPerPage
  //   .map(([key, value], colIndex) => (
  //     <Td
  //       key={colIndex}
  //       hidden={
  //         columnsSrt.find((col) => col.name == key)
  //           ? columnsSrt.find((col) => col.name == key).hidden
  //           : true
  //       }
  //       width={
  //         columnsSrt.find((col) => col.name == key)
  //           ? columnsSrt.find((col) => col.name == key).width
  //           : "25%"
  //       }
  //     >
  //       {value}
  //     </Td>
  //   ))}

  return (
    <SearchContainer>
      <div>
        <Pager
          {...{
            currentPage,
            length: Object.keys(data).length,
            totRecords: null,
            handlePageChange,
          }}
        ></Pager>
        <Table theme={theme}>
          <thead>
            <Tr theme={theme}>
              {serialNo.required && (
                <Th
                  name={serialNo.name}
                  title={serialNo.title}
                  colWidth={serialNo.width}
                  align={serialNo.align}
                  handleSort={handleSort}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                ></Th>
              )}
              {columnsSrt.map((column) => (
                <Th
                  name={column.name}
                  handleSort={handleSort}
                  hidden={column.hidden}
                  theme={theme}
                  title={column.displayName || column.name}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  colWidth={column.width}
                />
              ))}
              {actions.required && (
                <Th
                  name={actions.name}
                  title={actions.title}
                  colWidth={actions.width}
                  align={actions.align}
                />
              )}
            </Tr>
          </thead>
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
                            columnsSrt.find((col) => col.name == key)
                              ? columnsSrt.find((col) => col.name == key).hidden
                              : true
                          }
                          colWidth={
                            columnsSrt.find((col) => col.name == key)
                              ? columnsSrt.find((col) => col.name == key).width
                              : "25%"
                          }
                        >
                          {value}
                        </Td>
                      ))}
                    {actions.required && (
                      <Td key={"actions"} theme={theme} colWidth={actions.width}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "0px",
                          }}
                        >
                          <Link
                            to="/role/edit"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <Icon
                              type={"view"}
                              width={25}
                              height={25}
                              hasBackGround={true}
                              backGroundColor={"blue"}
                              isLink={true}
                            ></Icon>
                          </Link>
                          <Icon
                            type={"delete"}
                            width={25}
                            height={25}
                            hasBackGround={true}
                            backGroundColor={"red"}
                            islink={true}
                          ></Icon>
                          <Icon
                            type={"print"}
                            width={25}
                            height={25}
                            hasBackGround={true}
                            backGroundColor={"green"}
                          ></Icon>
                        </div>
                      </Td>
                    )}
                  </Tr>
                ))
              : null}
          </tbody>
        </Table>
        <div style={{ fontWeight: 300, margin: "10px 0px" }}>{`Showing ${
          startIndex + 1
        } to ${
          endIndex > totCount ? totCount : endIndex
        } of ${totCount} records`}</div>
      </div>
    </SearchContainer>
  );
};

export default DataTable;
