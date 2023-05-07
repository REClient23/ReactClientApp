import { Button, Label } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Outlet, Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import React from "react";
function LandingPage() {
  const startContent = (
    <React.Fragment>
      <div>
        <div className="bp4-navbar-group bp4-align-left">
          <Label style={{ color: "aliceblue", alignContent: "center",marginLeft:"15px",marginTop:"15px" }}>            
            Remax Crystal
          </Label>
        </div>
        <div className="bp4-navbar-group bp4-align-left">
          <Button icon="dashboard" className="bp4-minimal">
            <Link to={`LeadManagement`} style={{ color: "aliceblue" }}>
              Dashboard
            </Link>
          </Button>
          <span className="bp4-navbar-divider"></span>
          <Button icon="rocket" className="bp4-minimal">
            <Link to={`Leads`} style={{ color: "aliceblue" }}>
              Leads
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
    <div className="bp4-navbar-group bp4-align-right">
      <Button icon="user" className="bp4-minimal"></Button>
    </div>
  );
  return (
    <Toolbar
      start={startContent}
      end={endContent}
      style={{ padding: "0px", marginTop: "0px", backgroundColor: "#111f26" }}
    />
  );
}
/*<Button icon="notifications" className="bp4-minimal"></Button>
            <Button icon="cog" className="bp4-minimal"></Button>*/

export default LandingPage;
