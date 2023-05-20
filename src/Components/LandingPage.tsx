import { Button, Label } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Outlet, Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import React, { useContext } from "react";
import { AppContext } from "../States/AppProvider";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import { Tooltip } from "primereact/tooltip";

function LandingPage() {
  const { state } = useContext(AppContext);
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
          <Button icon="dashboard" className="bp4-minimal">
            <Link to={`LeadManagement`} style={{ color: "aliceblue" }}>
              Dashboard
            </Link>
          </Button>
          <Button icon="rocket" className="bp4-minimal">
            <Link to={`Leads`} style={{ color: "aliceblue" }}>
              Leads
            </Link>
          </Button>
          <Button icon="home" className="bp4-minimal">
            <Link to={`Property`} style={{ color: "aliceblue" }}>
              Property
            </Link>
          </Button>
          <Button icon="settings" className="bp4-minimal">
            <Link to={`CodeTypes`} style={{ color: "aliceblue" }}>
              Code Types
            </Link>
          </Button>
          <Button icon="manually-entered-data" className="bp4-minimal">
            <Link to={`CodeTypeValue`} style={{ color: "aliceblue" }}>
              Code Types Values
            </Link>
          </Button>
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
