import "./LandingPage.css";
import { Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Outlet, Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="div-red">
      <nav className="bp4-navbar bp4-dark">
        <div>
          <div className="bp4-navbar-group bp4-align-left">
            <div className="bp4-navbar-heading">Remax Crystal</div>
          </div>
          <div className="bp4-navbar-group bp4-align-left">
            <Button icon="home" className="bp4-minimal">
              <Link to={`LeadManagement`}>Home</Link>
            </Button>
            <span className="bp4-navbar-divider"></span>
            <Button icon="rocket" className="bp4-minimal">
                <Link to={`Leads`}>Leads</Link>
            </Button>
            <Button icon="settings" className="bp4-minimal">
                <Link to={`CodeTypes`}>Code Types</Link>
            </Button>
            <Button icon="manually-entered-data" className="bp4-minimal">
                <Link to={`CodeTypeValue`}>Code Types Values</Link>
            </Button>
          </div>
          <div className="bp4-navbar-group bp4-align-right">
            <Button icon="user" className="bp4-minimal"></Button>
            <Button icon="notifications" className="bp4-minimal"></Button>
            <Button icon="cog" className="bp4-minimal"></Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default LandingPage;
