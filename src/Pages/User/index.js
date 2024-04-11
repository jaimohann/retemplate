import React from "react";
import { EntityProvider } from "../Components/Entity";
import Search from "./Search";
import Form from "./Form";

const User = () => {
  return (
    <EntityProvider
      search={<Search />}
      form={<Form />}
      title={"User"}
      breadcrumps={"User"}
    ></EntityProvider>
  );
};

export default User;
