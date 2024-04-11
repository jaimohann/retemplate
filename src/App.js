import { AppProvider } from "./Context/Application";

import React from "react";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout></Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
