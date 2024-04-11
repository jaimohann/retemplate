import React, { isValidElement } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Search from "../Pages/Components/Entity/Search";
import Form from "../Pages/Components/Entity/Form";

const EntityRoutes = ({ search, form }) => {
  return (
    <>
      <Outlet></Outlet>
      <Routes>
        <Route
          path="/"
          element={
            search ? (
              isValidElement(search) ? (
                search
              ) : (
                <Search search={search} />
              )
            ) : (
              isValidElement(form) ? form : <Form form={form} />
            )
          }
        />
        <Route
          path="/create"
          element={isValidElement(form) ? form : <Form form={form} />}
        />
        <Route
          path="/edit"
          element={isValidElement(form) ? form : <Form form={form} />}
        />
      </Routes>
    </>
  );
};

export default EntityRoutes;
