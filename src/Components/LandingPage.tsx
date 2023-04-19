import "./LandingPage.css";
import { Button, Icon, TextArea } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";


function LandingPage() {
  return (  
      <div className="div-red"> 
        <nav className="bp4-navbar bp4-dark">
          <div>
            <div className="bp4-navbar-group bp4-align-left">
              <div className="bp4-navbar-heading">My Company</div>
            </div>
            <div className="bp4-navbar-group bp4-align-left">
              <Button icon="home" className="bp4-minimal">Home</Button>
              <span className="bp4-navbar-divider"></span>
              <Button icon="document" className="bp4-minimal">Files</Button>
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
