import { Button, Label } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Outlet, Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../States/AppProvider";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import { Tooltip } from "primereact/tooltip";
import {
  ModuleName,
  appBaseURL,
} from "../CommonComponents/ApplicationConstants";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";

function LandingPage() {
  const { state } = useContext(AppContext);

  const [isDashBoardVisible, setDashBoardVisible] = useState<boolean>(false);
  const [isLeadsVisible, setLeadsVisible] = useState<boolean>(false);
  const [isPropertyVisible, setPropertyVisible] = useState<boolean>(false);
  const [isCodeTypeVisible, setCodeTypeVisible] = useState<boolean>(false);
  const [isCodeTypeValuesVisible, setCodeTypeValuesVisible] =
    useState<boolean>(false);
  const [isUserVisible, setUserVisible] = useState<boolean>(false);
  const [isRoleManagementVisible, setRoleManagementVisible] =
    useState<boolean>(false);

  useEffect(() => selectedCTVData(), []);

  const selectedCTVData = () => {
    fetch(appBaseURL + "/api/Permissions/" + `${state.user.role}`)
      .then((result) => result.json())
      .then((subrowData: CodeTypeValues[]) => {
        LoadPermission(subrowData);
      })
      .catch((error) => console.log(error));
  };

  const LoadPermission = (subrowData: CodeTypeValues[]) => {
    console.log(subrowData);

    const codeTypeValues = subrowData?.some(
      (record) => record.shortCode === ModuleName.CodeTypeValues
    );
    if (codeTypeValues === true) {
      setCodeTypeValuesVisible(codeTypeValues);
    }

    const codeType = subrowData?.some(
      (record) => record.shortCode === ModuleName.CodeTypes
    );
    if (codeType === true) {
      setCodeTypeVisible(codeType);
    }

    const DASHBOARD = subrowData?.some(
      (record) => record.shortCode === ModuleName.DASHBOARD
    );
    if (DASHBOARD === true) {
      setDashBoardVisible(DASHBOARD);
    }

    const LEADS = subrowData?.some(
      (record) => record.shortCode === ModuleName.LEADS
    );
    if (LEADS === true) {
      setLeadsVisible(LEADS);
    }
    const PROPERTY = subrowData?.some(
      (record) => record.shortCode === ModuleName.PROPERTY
    );
    if (PROPERTY === true) {
      setPropertyVisible(PROPERTY);
    }
    const RoleManagement = subrowData?.some(
      (record) => record.shortCode === ModuleName.RoleManagement
    );
    if (RoleManagement === true) {
      setRoleManagementVisible(RoleManagement);
    }
    const User = subrowData?.some(
      (record) => record.shortCode === ModuleName.User
    );
    if (User === true) {
      setUserVisible(User);
    }

    if (state.user.role === "SuperAdmin") {
      setCodeTypeValuesVisible(true);
      setCodeTypeVisible(true);
      setDashBoardVisible(true);
      setLeadsVisible(true);
      setPropertyVisible(true);
      setRoleManagementVisible(true);
      setUserVisible(true);
    }
  };

  const startContent = (
    <React.Fragment>
      <div>
        <div className="bp4-navbar-group bp4-align-left">
          <Label
            style={{
              color: "aliceblue",
              alignContent: "center",
              marginLeft: "15px",
              marginTop: "15px",
            }}
          >
            Remax Crystal
          </Label>
        </div>
        <div className="bp4-navbar-group bp4-align-left">
          {isDashBoardVisible && (
            <Button icon="dashboard" className="bp4-minimal">
              <Link to={`LeadManagement`} style={{ color: "aliceblue" }}>
                Dashboard
              </Link>
            </Button>
          )}
          {isLeadsVisible && (
            <Button icon="rocket" className="bp4-minimal">
              <Link to={`Leads`} style={{ color: "aliceblue" }}>
                Leads
              </Link>
            </Button>
          )}
          {isPropertyVisible && (
            <Button icon="home" className="bp4-minimal">
              <Link to={`Property`} style={{ color: "aliceblue" }}>
                Property
              </Link>
            </Button>
          )}
          {isCodeTypeVisible && (
            <Button icon="settings" className="bp4-minimal">
              <Link to={`CodeTypes`} style={{ color: "aliceblue" }}>
                Code Types
              </Link>
            </Button>
          )}
          {isCodeTypeValuesVisible && (
            <Button icon="manually-entered-data" className="bp4-minimal">
              <Link to={`CodeTypeValue`} style={{ color: "aliceblue" }}>
                Code Types Values
              </Link>
            </Button>
          )}
          {isRoleManagementVisible && (
            <Button icon="people" className="bp4-minimal">
              <Link to={`RoleManagement`} style={{ color: "aliceblue" }}>
                Role Management
              </Link>
            </Button>
          )}
          {isUserVisible && (
            <Button icon="new-person" className="bp4-minimal">
              <Link to={`Users`} style={{ color: "aliceblue" }}>
                Users
              </Link>
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );

  const endContent = (
    <div
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        overflow: "hidden",
        margin: "0 auto",
        marginRight: "5px",
      }}
    >
      <Tooltip target=".logo" />
      <Image
        className="logo"
        data-pr-tooltip={state.user.username}
        data-pr-position="left"
        data-pr-at="right+100 top"
        data-pr-my="left center"
        src={state.user.Image}
        alt="Login Image"
        height="30px"
      />
    </div>
  );
  return (
    <Toolbar
      start={startContent}
      end={endContent}
      style={{ padding: "1px", marginTop: "0px", backgroundColor: "#111f26" }}
    />
  );
}
/*<Button icon="notifications" className="bp4-minimal"></Button>
            <Button icon="cog" className="bp4-minimal"></Button>*/

export default LandingPage;
