import { AppProvider } from "./Context/Application";

import React, { useState } from "react";
import Layout from "./Layout";
import { Routes, Route, Link, Navigate, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./Routing/PrivateRoute";
import Login from "./Pages/Login";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
      <Layout></Layout>
        {/* <Routes>
          <Route
            index
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes> */}
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
