import React from "react";
import { DataTableProvider } from "./DTContext";

import Table from "./Table";

const DataTable = ({ format }) => {
  return (
    <DataTableProvider format={format}>
      <Table></Table>
    </DataTableProvider>
  );
};

export default DataTable;
