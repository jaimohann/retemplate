import React from "react";
import {EntityProvider} from "../Components/Entity";
import Search from "./Search";
import Form from "./Form";

const Menu = () => {
  return (
    <EntityProvider
      search={<Search />}
      form={<Form />}
      title={"Menu"}
      breadcrumps={"Menu"}
    ></EntityProvider>
  );
};

export default Menu;
