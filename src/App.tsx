import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Components/LandingPage";

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
import PropertyLandingPage from "./Property/PropertyLandingPage";
import Login_Form from "./Login/Login_form";
import GoogleLoginPage from "./Login/GoogleLogin";
import TelegramIntegration from "./Telegram/TelegramIntegration";
import RoleManagementLandingPage from "./AccessManagement/Rolemanagement/RoleManagementLandingPage";
import UsersLandingPage from "./AccessManagement/UserMangement/UsersLandingPage";
function App() {
  const [loggedin, setLoggedin] = useState(false);
  return loggedin ? (
    <div className="App">
      <BrowserRouter>
        <LandingPage />
        <Outlet />
        <Routes>
          <Route path="/Leads" element={<LeadsLandingPage />} />
          <Route path="/CodeTypes" element={<CodeTypesLandingPage />} />
          <Route path="/CodeTypeValue" element={<CodeTypeValueLandingPage />} />
          <Route path="/LeadManagement" element={<LeadManagmentLandingPage />}/>
          <Route path="/Property" element={<PropertyLandingPage />} />
          <Route path="/RoleManagement" element={<RoleManagementLandingPage />} />
          <Route path="/Users" element={<UsersLandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  ) : (
    <div>
    <GoogleLoginPage  onLoginSuccessHandler={()=>setLoggedin(true)}/>
    {/* <TelegramIntegration/> */}
    </div>
  );
}

export default App;
