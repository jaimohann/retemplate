import React from "react";
import Entity from "../Components/Entity";
import Search from "./Search";
import Form from './Form'


const Role = () => {
  return (
    <Entity
      search={<Search />}
      //form={<Form />}
      title={"Role"}
      breadcrumps={"Role"}
    ></Entity>
  );
};

export default Role;
