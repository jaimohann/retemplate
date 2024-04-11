import React from "react";
import DataTable from "../Components/Datatable";
import { search } from "./Structure";

const Search = () => {
  return <DataTable format={search}></DataTable>;
};

export default Search;
