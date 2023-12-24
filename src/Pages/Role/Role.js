import React from "react";
import DataTable from "../Components/Datatable";
import { Search } from "./Structure";
import { generateRandomData } from "./Roles";

const data = generateRandomData(125);

const Role = () => {
  return <DataTable format={Search} data1={data}></DataTable>;
};

export default Role;
