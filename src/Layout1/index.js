import React from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "styled-components";
import { LayoutProvider } from "../Context/Layout";
import { useApp } from "../Context/Application";
import themes from "../Theme";
import Header from "./Header/Header";
import Content from "./Content";
import Footer from "./Footer";
import Sidebar1 from "./Sidebar1";
const Layout = () => {
  const { activeTheme } = useApp();
  console.log(activeTheme, themes);

  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <LayoutProvider>
        <Sidebar></Sidebar>
        <Content>
          <Header></Header>

          

          <Footer />
        </Content>
      </LayoutProvider>
    </ThemeProvider>
  );
};
export default Layout;
