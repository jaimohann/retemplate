import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Icon } from "../../assets/Icon";
import { Link } from "react-router-dom";
import Pager from "./Datatable/Pager.js";
import Tr from "./Datatable/Tr.js";
import Th from "./Datatable/Th.js";
import Td from "./Datatable/Td.js";

// Sample data

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
`;

const DataTable = ({ format, data1 }) => {
  const columns = format ? format.columns : [];
  const serialNo = format ? format.serialNo : true;
  const itemsPerPage = format ? format.itemsPerPage : 1;
  const order = format ? format.initialSort.order : "asc";
  const name = format ? format.initialSort.name : "";

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/octocat/Hello-World/issues?page=${currentPage}&per_page=${itemsPerPage}`,
        {}
      ); // Update the path to your JSON file
      const resp = await response.json();
      setData(resp);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    //fetchItems();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(order);
  const [data, setData] = useState(data1);
  const { theme } = useTheme();

  // Function to sort the data based on the selected key and order
  const sortedData = [...data].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    return a[sortKey] > b[sortKey] ? order : -order;
  });

  // Function to handle header cell click for sorting
  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    fetchItems();
  };

  // Paginate the sorted data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totCount = data.length;

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(data);
  };

  const columnsSrt = columns.sort((a, b) => {
    if (a.hidden === b.hidden) {
      return 0;
    }
    return a.hidden ? 1 : -1;
  });

  console.log(columnsSrt);

  return (
    <SearchContainer>
      <div>
        <Pager
          {...{
            theme,
            currentPage,
            length: Math.ceil(sortedData.length / itemsPerPage),
            handlePageChange,
          }}
        ></Pager>
        <Table theme={theme}>
          <thead>
            <Tr theme={theme}>
              {serialNo && (
                <Th
                  theme={theme}
                  key={"serial_no"}
                  handleSort={handleSort}
                  title={"#"}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                ></Th>
              )}
              {columnsSrt.map((column) => (
                <Th
                  key={column.name}
                  onClick={() => handleSort(column.name)}
                  hidden={column.hidden}
                  theme={theme}
                  title={column.displayName || column.name}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                />
              ))}
              <Th
                key={"actions"}
                onClick={handleSort}
                hidden={false}
                theme={theme}
                title={"Actions"}
                sortKey={sortKey}
                sortOrder={sortOrder}
              />
            </Tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <Tr key={rowIndex}>
                <Td
                  key={"serial_no"}
                  theme={theme}
                  value={(currentPage - 1) * itemsPerPage + rowIndex + 1}
                ></Td>
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
                      theme={theme}
                      title={value}
                    >
                      {value}
                    </Td>
                  ))}
                <Td key={"actions"} theme={theme}>
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
                        width={30}
                        height={30}
                        isLink={true}
                      ></Icon>
                    </Link>
                    <Icon type={"delete"} width={30} height={30}></Icon>
                    <Icon type={"print"} width={30} height={30}></Icon>
                  </div>
                </Td>
              </Tr>
            ))}
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
