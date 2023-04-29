import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import LoginForm from "./Login/LoginForm";
import LeadsLandingPage from "./Leads/LeadsLandingPage";
import CodeTypesLandingPage from "./CodeTypes/CodeTypesLandingPage";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import CodeTypeValueLandingPage from "./CodeTypeValues/CodeTypeValueLandingPage";
import LeadManagmentLandingPage from "./LeadManagement/LeadManagmentLandingPage";

function App() {
  return (
    <div className="App">      
      <BrowserRouter>
      <LandingPage/>
      <Outlet/>
        <Routes>          
          <Route path="/Leads" element={<LeadsLandingPage />} />
          <Route path="/CodeTypes" element={<CodeTypesLandingPage />} />
          <Route path="/CodeTypeValue" element={<CodeTypeValueLandingPage />} />
          <Route path="/LeadManagement" element={<LeadManagmentLandingPage />} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
