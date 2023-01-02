// ./screens/front/MainScreen.jsx

import React from "react";
import StickyHeader from "../../components/header/StickyHeader.jsx";
import Main from "../../components/Main.jsx";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./HomeScreen.jsx";
import RegisterScreen from "./RegisterScreen.jsx";
import LoginScreen from "./LoginScreen.jsx";
import ProtectedRoute from "../../routing/ProtectedRoute.jsx";
import AdministrationScreen from "../admin/AdministrationScreen.jsx";
import Footer from "../../components/footer/Footer.jsx";

const MainScreen = () => {
  return (
    <>
      <div className="relative min-h-screen overflow-clip">
        <StickyHeader />
        <Main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route
              element={
                <ProtectedRoute roles={["ROLE_MODERATOR", "ROLE_ADMIN"]} />
              }
            >
              <Route path="/administrate" element={<AdministrationScreen />} />
            </Route>
          </Routes>
        </Main>
      </div>
      <Footer />
    </>
  );
};

export default MainScreen;
