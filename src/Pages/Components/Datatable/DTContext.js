import React, { createContext, useContext, useState, useEffect } from "react";
import { useApp } from "../../../Context/Application";
import { useDialogue } from "../../../Context/Dialogue";
import { useEntity } from "../Entity";
import { useNavigate } from "react-router-dom";

const DataTableContext = createContext();

export const useDataTable = () => {
  return useContext(DataTableContext);
};

export const DataTableProvider = ({ format, children }) => {
  const { privateRequest } = useApp();
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
  const { showDialogue } = useDialogue();
  const { setActiveId, setFormMode } = useEntity();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    showDialogue({
      type: "alert",
      title: "Delete",
      body: "Are you sure you want to Continue ?",
      ok: "Yes",
      cancel: "Cancel",
      callback: async () => {
        const options = {
          method: "DELETE",
          redirect: "follow",
        };
        const response = await privateRequest(
          `/${"v1"}/${format.endPoint}/${id}`,
          options
        );
        setData((prevData) => {
          const updatedData = {};

          for (const key in prevData) {
            if (prevData.hasOwnProperty(key)) {
              const newArray = prevData[key].filter((item) => item.id !== id);
              updatedData[key] = newArray;
            }
          }

          return updatedData;
        });
      },
    });
  };

  const handleView = (id) => {
    setFormMode("edit");
    setActiveId(id);
    navigate("edit");
  };

  const handleCreate = (id) => {
    setFormMode("create");
    navigate("create");
  };

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

  const columnsSrt = columns.sort((a, b) => {
    if (a.hidden === b.hidden) {
      return 0;
    }
    return a.hidden ? 1 : -1;
  });

  const reArrangeResult = (data) =>
    data.map((obj) => {
      const filteredObj = {};
      columnsSrt.forEach(({ name, refCol, path }) => {
        if (refCol) filteredObj[name] = obj?.[path]?.[refCol];
        else filteredObj[name] = obj[name];
      });
      return filteredObj;
    });

  const fetchItems = async (currentPage, itemsPerPage) => {
    try {
      if (!data[currentPage]) {
        setBusy(true);

        const options = {
          method: "GET",
          redirect: "follow",
        };
        const populate =
          "populate=" +
          columns
            .filter((a) => a.path != null)
            .map((a) => `${a.path}.${a.ref}.${a.refCol}`)
            .join(",") +
          "&";
        const select =
          "select=" +
          columns
            .filter((a) => a.path == null)
            .map((a) => `${a.name}`)
            .join(" ") +
          "&";
        const response = await privateRequest(
          `/${"v1"}/${
            format.endPoint
          }?${populate}${select}limit=${itemsPerPage}&page=${currentPage}`,
          options
        );
        const resp = reArrangeResult(response.results);
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

  const paginatedData = sortData();

  const value = {
    currentPage,
    setCurrentPage,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    data,
    setData,
    busy,
    setBusy,
    serialNo,
    actions,
    columns: columnsSrt,
    paginatedData,
    itemsPerPage,
    handleDelete,
    handleView,
    handleCreate,
  };

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};
