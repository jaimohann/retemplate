import React from "react";
import DataTable from "../../Components/Datatable";
import { search } from "./Format";

const Search = () => {
  return <DataTable format={search}></DataTable>;
};

export default Search;