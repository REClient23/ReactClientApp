import {
  Alignment,
  Button,
  Classes,
  Icon,
  Navbar,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import React, { useRef, useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { ParentToChildHandler } from "../CommonComponents/ParentToChildHandler";
import AddLeadNotes from "./AddLeadNotes";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import LeadNotesTimeLinePage from "./LeadNotesTimeLinePage";



function LMDetailsPage() {
  const EmberPanel: React.FC = () => (
    <div>  
      
      <LeadNotesTimeLinePage  />      
      
    </div>
  );  
  return (
    <div>
      <Navbar>        
        <Navbar.Group align={Alignment.LEFT}>
          <Tabs id="navbar"  fill={true}>
            <Tab id="Profile" title="Profile" icon="user" />
            <Tab
              id="Activity"
              title="Activity"
              icon="chat"
              panel={<LeadNotesTimeLinePage />}
            ></Tab>
            <Tab
              id="Appointments"
              title="Appointments"
              icon="timeline-events"
              tagContent="2"
              tagProps={{ round: true, intent: "danger" }}
            />
            <Tab
              id="Properties"
              title="Properties"
              icon="home"
              tagContent="7"
              tagProps={{ round: true, intent: "danger" }}
            />
            <Tab id="Analytics" title="Analytics" icon="chart" />
            <Tab id="Funnel" title="Funnel" icon="filter" />
          </Tabs>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}

export default LMDetailsPage;
